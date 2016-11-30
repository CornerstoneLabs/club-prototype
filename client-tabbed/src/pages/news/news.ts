import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsRepository } from '../../repository/news.repository';
import { NewsModel } from '../../model/news.model';
import { AuthenticationEvent } from '../../http/authentication.event';
import { NewsDetailPage } from "./news-detail";
import {SocketManager} from "../../http/socket.manager";
import {NewsCreatePage} from "./news-create";

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
		public navController: NavController,
		private socketManager: SocketManager
	) {

	}

	ngOnInit () {
		this.title = 'News';
		this.getData();

		let _this = this;

		this.authenticationEvent.onHasAuthenticated(()=> {
			_this.getData();
		});

		this.socketManager.onUpdate(()=> {
			console.log('fetching dat');
			_this.getData();
		});
	}

	ngOnDestroy () {

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
			id: item.id,
			origin: this
		};

		this
			.navCtrl
			.push(NewsDetailPage, params, opts);
	}

	create () {
		let opts = {
			animate: true,
			direction: 'forward'
		};

		let params = {
			origin: this
		};

		this
			.navCtrl
			.push(NewsCreatePage, params, opts);
	}
}
