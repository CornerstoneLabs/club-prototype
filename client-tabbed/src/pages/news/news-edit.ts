import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { NewsRepository } from '../../repository/news.repository';
import { NewsModel } from '../../model/news.model';
import { AuthenticationEvent } from '../../http/authentication.event';

@Component({
	selector: 'page-news-edit',
	templateUrl: 'news-edit.html'
})
export class NewsEditPage {
	errorMessage: string;
	title: string;
	data: NewsModel;
	id: number;

	constructor(
		public navCtrl: NavController,
		private newsRepository: NewsRepository,
		private authenticationEvent: AuthenticationEvent,
		private navParams: NavParams
	) {

	}

	ngOnInit() {
		this.title = 'News';
		this.id = this.navParams.get('id');

		this.getData();

		let _this = this;
		this.authenticationEvent.onHasAuthenticated(()=> {
			_this.getData();
		});
	}

	getData () {
		this
			.newsRepository
			.get(this.id)
			.subscribe(
				data => this.data = data,
				error =>  this.errorMessage = <any>error
			);
	}

	save () {
		this
			.newsRepository
			.save(this.data)
			.subscribe(
				data => {
				    this.navParams.get('origin').getData();
					this.navCtrl.pop();
				},
				error => this.errorMessage = <any>error
			);
	}
}
