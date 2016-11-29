import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

var authenticationSubscribers = new Array();
var hasAuthenticatedSubscribers = new Array();

@Injectable()
export class AuthenticationEvent {
	onNeedsAuthentication (fn) {
		authenticationSubscribers.push(fn);
	}

	needsAuthentication (retry=false) {
		authenticationSubscribers.forEach(item => {
			item(retry);
		});
	}

	onHasAuthenticated (fn) {
		hasAuthenticatedSubscribers.push(fn);
	}

	hasAuthenticated () {
		hasAuthenticatedSubscribers.forEach(item => {
			item();
		});
	}
}
