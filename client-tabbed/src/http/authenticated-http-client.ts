import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '../app/app.settings';
import { AuthenticationManager } from './authentication.manager';
import { AuthenticationEvent } from './authentication.event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticatedHttpClient {
	constructor (
		private http: Http,
		private applicationSettings: ApplicationSettings,
		private authenticationManager: AuthenticationManager,
		private authenticationEvent: AuthenticationEvent
	) {

	}

	authenticationHeaders(headers: Headers) {
		let bearer = this.authenticationManager.getBearer();
		headers.append('Authorization', 'Bearer ' + bearer);
	}

	createUrl(url) {
		let remote = this.applicationSettings.get('SERVER_URL');
		return `${remote}${url}`;
	}

	get(url) {
		let headers = new Headers();
		this.authenticationHeaders(headers);
		let params = {
			headers: headers
		};
		let fullUrl = this.createUrl(url);
		let _this = this;

		let result =
			this
				.http
				.get(fullUrl, params)
				.catch(function (error) {
					return _this.handleError(error);
				});

		return result;
	}

	post(url, data) {
		return this.verb(url, data, 'post');
	}

	patch(url, data) {
		return this.verb(url, data, 'patch');
	}

	verb(url, data, httpVerb) {
		let headers = new Headers();
		this.authenticationHeaders(headers);
		let params = {
			headers: headers
		};
		let fullUrl = this.createUrl(url);
		let _this = this;

		let result = this
			.http
			[httpVerb](fullUrl, data, params)
			.catch(function (error) {
				return _this.handleError(error);
			});

		return result;
	}

	private handleError (error: Response | any) {
		let errMsg: string;

		if (error.status === 401) {
			this.authenticationEvent.needsAuthentication();
			return Observable.throw(errMsg);
		}

		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);

		return Observable.throw(errMsg);
	}

	handleAuthentication(error: Response | any) {
		this.authenticationEvent.needsAuthentication();
		return Observable.throw('');
	}
}
