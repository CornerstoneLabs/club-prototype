import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

class FormModelData {
	constructor(
		public username: string,
		public password: string
	) {
		this.username = 'adam';
		this.password = 'm0nk3ym0nk3y';
	}
}

@Component({
	templateUrl: 'login.html'
})
export class Login {
	data = new FormModelData('', '');

	constructor(
		public viewCtrl: ViewController,
		public params: NavParams
	) {
	}

	signIn() {
		this.viewCtrl.dismiss(this.data);
	}

	dismiss () {

	}
}
