import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { NewsRepository } from '../../repository/news.repository';
import { AuthenticationEvent } from '../../http/authentication.event';

@Component({
	selector: 'page-news-create',
	templateUrl: 'news-create.html'
})
export class NewsCreatePage {
	errorMessage: string;
	title: string;
	id: number;
	content: string;
	published: boolean;

	constructor(
		public navCtrl: NavController,
		private newsRepository: NewsRepository,
		private authenticationEvent: AuthenticationEvent,
		private navParams: NavParams
	) {

	}

	ngOnInit() {
		this.title = 'Add news';
		this.content = '';
		this.published = false;
	}

    ngOnDestroy () {
        this.navParams.get('origin').getData();
    }

	save () {
		let data = {
			content: this.content
		};

		if (this.published === true) {
			data['published'] = true;
		}

		this
			.newsRepository
			.create(data)
			.subscribe(
				data => {
					this.navCtrl.pop();
				},
				error => this.errorMessage = <any>error
			);
	}
}
