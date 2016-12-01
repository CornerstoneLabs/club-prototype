import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticatedHttpClient } from '../http/authenticated-http-client';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserRepository {
    private url = '/user-profile/';

    constructor (
        private http: AuthenticatedHttpClient
    ) {

    }

    ngOnInit(): void {
        this.all();
    }

    all (): Observable<UserModel[]> {
        let result =
            this.http
                .get(this.url)
                .map(this.extractData);

        return result;
    }

    current (): Observable<UserModel> {
        let result =
            this
                .http
                .get('/actions/classes/current-user/')
                .map(this.extractData);

        return result;
    }

    private extractData (response: Response) {
        let body = response.json();
        console.log(body);

        return body || {};
    }
}
