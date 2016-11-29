import { Component } from '@angular/core';
import { SituationRepository } from '../../repository/situation.repository';
import { SituationModel } from '../../model/situation.model';
import { NavController } from 'ionic-angular';
import {SituationDetailPage} from "./situation-detail";

@Component({
	selector: 'page-situation',
	templateUrl: 'situation.html'
})
export class SituationPage {
	private errorMessage: string;
	title: string;
	data: SituationModel[];

	constructor(
		public navCtrl: NavController,
		private situationRepository: SituationRepository
	) {

	}

	ngOnInit() {
		this.title = 'Classes';
		this.getData();
	}

	getData () {
		this
			.situationRepository
			.all()
			.subscribe(
				data => this.data = data,
				error => this.errorMessage = <any>error);
	}

	details (item) {
		let opts = {
			animate: true,
			direction: 'forward'
		};

		let params = {
			id: item.id
		};

		this
			.navCtrl
			.push(SituationDetailPage, params, opts);
	}
}
