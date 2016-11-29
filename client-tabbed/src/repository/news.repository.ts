import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticatedHttpClient } from '../http/authenticated-http-client';
import { Observable } from 'rxjs/Observable';
import { NewsModel } from '../model/news.model';

@Injectable()
export class NewsRepository {
	private url = '/articles/';

	constructor (
		private http: AuthenticatedHttpClient
	) {

	}

	ngOnInit(): void {
		this.all();
	}

	all (): Observable<NewsModel[]> {
		let result =
			this.http
				.get(this.url)
				.map(this.extractData);

		return result;
	}

	private extractData (response: Response) {
		let body = response.json();

		return body || {};
	}
}
