import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { NewsRepository } from '../../repository/news.repository';
import { NewsModel } from '../../model/news.model';
import { AuthenticationEvent } from '../../http/authentication.event';
import {NewsEditPage} from "./news-edit";

@Component({
	selector: 'page-news-detail',
	templateUrl: 'news-detail.html'
})
export class NewsDetailPage {
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
			.push(NewsEditPage, params, opts);
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
}
