import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticatedHttpClient } from '../http/authenticated-http-client';
import { Observable } from 'rxjs/Observable';
import { LocationModel } from '../model/location.model';

@Injectable()
export class LocationRepository {
    private url = '/locations/';

    constructor (private http: AuthenticatedHttpClient) {

    }

    ngOnInit(): void {
        this.all();
    }

    all (): Observable<LocationModel[]> {
        let result =
            this.http
                .get(this.url)
                .map(this.extractData);

        return result;
    }

    get (id): Observable<LocationModel> {
        let result =
            this.http
                .get(this.url + id + '/')
                .map(this.extractData);

        return result;
    }

    create (data): Observable<LocationModel[]> {
        let result =
            this.http
                .post(this.url, data)
                .map(this.extractData);

        return result;
    }

    save (data): Observable<LocationModel[]> {
        let result =
            this.http
                .patch(this.url + data['id'] + '/', data)
                .map(this.extractData);

        return result;
    }

    private extractData (response: Response) {
        let body = response.json();
        console.log(body);

        return body || {};
    }
}
