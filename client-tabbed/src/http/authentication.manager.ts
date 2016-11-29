import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CredentialModel } from './credential.model';
import { ApplicationSettings } from '../app/app.settings';
import { AuthenticationEvent } from '../http/authentication.event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationManager {
	bearer: string;

	constructor (
		private http: Http,
		private applicationSettings: ApplicationSettings,
		private authenticationEvent: AuthenticationEvent
	) {
		this.bearer = '';
	}

	getBearer(): string {
		return this.bearer;
	}

	authenticate (username: string, password: string) {
		let _this = this;

		return this
			.post(username, password)
			.subscribe(data => {
				_this.bearer = data.token;
				_this.authenticationEvent.hasAuthenticated();
			},
			error => {
				return Observable.throw('Invalid login');
			});
	}

	createUrl(url) {
		let remote = this.applicationSettings.get('SERVER_URL');
		return `${remote}${url}`;
	}

	post(username, password) {
		let _this = this;
		let data = {
			'username': username,
			'password': password
		};
		let fullUrl = this.createUrl('/api-token-auth/');
		let result = this
			.http
			.post(fullUrl, data)
            .map(this.extractData)
			.catch(function (error) {
				_this.authenticationEvent.needsAuthentication(true);
				return Observable.throw('');
			});

		return result;
	}

	private extractData (response: Response) {
		let body = response.json();

		return body || {};
	}
}
