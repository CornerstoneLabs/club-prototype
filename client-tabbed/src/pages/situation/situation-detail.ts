import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { SituationRepository } from '../../repository/situation.repository';
import { SituationModel } from '../../model/situation.model';
import { AuthenticationEvent } from '../../http/authentication.event';

@Component({
	selector: 'page-situation-detail',
	templateUrl: 'situation-detail.html'
})
export class SituationDetailPage {
	errorMessage: string;
	title: string;
	data: SituationModel[];
	id: number;

	constructor(
		public navCtrl: NavController,
		private situationRepository: SituationRepository,
		private authenticationEvent: AuthenticationEvent,
		private navParams: NavParams
	) {

	}

	ngOnInit() {
		this.title = 'Class';
		this.getData();
		this.id = this.navParams.get('id');

		let _this = this;
		this
			.authenticationEvent
			.onHasAuthenticated(()=> {
				_this.getData();
			});
	}

	getData () {
		this
			.situationRepository
			.all()
			.subscribe(
				data => this.data = data,
				error => this.errorMessage = <any>error);
	}
}
