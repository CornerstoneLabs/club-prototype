import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsRepository } from '../../repository/news.repository';
import { NewsModel } from '../../model/news.model';
import { AuthenticationEvent } from '../../http/authentication.event';
import { NewsDetailPage } from "./news-detail";

@Component({
	selector: 'page-news',
	templateUrl: 'news.html'
})
export class NewsPage {
	errorMessage: string;
	title: string;
	data: NewsModel[];

	constructor(
		public navCtrl: NavController,
		private newsRepository: NewsRepository,
		private authenticationEvent: AuthenticationEvent,
		public navController: NavController
	) {

	}

	ngOnInit() {
		this.title = 'News';
		this.getData();

		let _this = this;
		this.authenticationEvent.onHasAuthenticated(()=> {
			_this.getData();
		});
	}

	getData () {
		this.newsRepository.all()
			.subscribe(
				data => this.data = data,
				error =>  this.errorMessage = <any>error);
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
			.push(NewsDetailPage, params, opts);
	}
}
