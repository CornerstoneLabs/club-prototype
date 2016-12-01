import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UserRepository} from "../../repository/user.repository";
import {UserModel} from "../../model/user.model";

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {
	private errorMessage: string;
	title: string;
	data: UserModel;

	constructor(
		public navCtrl: NavController,
		public userRepository: UserRepository
	) {

	}

	ngOnInit() {
		this.title = 'Classes';
		this.getData();
	}

	getData () {
		this
            .userRepository
            .current()
            .subscribe(
				data => this.data = data,
				error => this.errorMessage = <any>error);
	}
}
