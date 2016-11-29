import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { NewsRepository } from '../../repository/news.repository';
import { NewsModel } from '../../model/news.model';
import { AuthenticationEvent } from '../../http/authentication.event';

@Component({
    selector: 'page-news-detail',
    templateUrl: 'news-detail.html'
})
export class NewsDetailPage {
    errorMessage: string;
    title: string;
    data: NewsModel[];
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
        this.getData();
        this.id = this.navParams.get('id');

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
}
