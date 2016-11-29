import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationSettings {
	get (key: string): string {
		return {
			SERVER_URL: 'http://club.ambientmind.co.uk',
			LOCAL_URL: 'http://127.0.0.1:8000'
		}[key];
	}
}
