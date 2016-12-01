import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Login } from './login';
import { AuthenticationEvent } from '../../http/authentication.event';
import { AuthenticationManager } from '../../http/authentication.manager';
import { TouchID } from 'ionic-native';

@Component({
	selector: 'login-mount',
	templateUrl: 'login-mount.html'
})
export class LoginMount
{
	constructor(
		private modalController: ModalController,
		private authenticationEvent: AuthenticationEvent,
		private authenticationManager: AuthenticationManager) {
	}

	ngOnInit() {
		let _this = this;

		this.authenticationEvent.onNeedsAuthentication(function (retry) {
			_this.presentProfileModal(retry);
		});
	}

	presentProfileModal(retry) {
		let profileModal = this.modalController.create(Login, {
			retry: retry
		});
		let _this = this;

		profileModal.onDidDismiss(data => {
			TouchID.verifyFingerprint('Scan your fingerprint please')
                .then(
					res => console.log('Ok', res),
					err => console.error('Error', err)
				);

			if (data !== null) {
				_this.authenticationManager.authenticate(data.username, data.password);
			}
		});

		profileModal.present(profileModal);
	}
}
