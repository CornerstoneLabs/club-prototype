import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { SituationRepository } from '../../repository/situation.repository';
import { SituationModel } from '../../model/situation.model';
import { AuthenticationEvent } from '../../http/authentication.event';
import {SituationEditPage} from "./situation-edit";

@Component({
	selector: 'page-situation-detail',
	templateUrl: 'situation-detail.html'
})
export class SituationDetailPage {
	errorMessage: string;
	title: string;
	data: SituationModel;
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
		this.id = this.navParams.get('id');

		this.getData();

		let _this = this;
		this
			.authenticationEvent
			.onHasAuthenticated(()=> {
				_this.getData();
			});
	}

	ngOnDestroy () {
		this.navParams.get('origin').getData();
	}

	edit () {
		let opts = {
			animate: true,
			direction: 'forward'
		};

		let params = {
			id: this.id,
			origin: this
		};

		this
            .navCtrl
            .push(SituationEditPage, params, opts);
	}

	getData () {
		this
			.situationRepository
            .get(this.id)
			.subscribe(
				data => this.data = data,
				error => this.errorMessage = <any>error);
	}
}
