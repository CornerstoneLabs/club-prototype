import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { SituationRepository } from '../../repository/situation.repository';
import { AuthenticationEvent } from '../../http/authentication.event';

@Component({
    selector: 'page-situation-create',
    templateUrl: 'situation-create.html'
})
export class SituationCreatePage {
    errorMessage: string;
    title: string;
    id: number;
    content: string;
    published: boolean;

    constructor(
        public navCtrl: NavController,
        private situationRepository: SituationRepository,
        private authenticationEvent: AuthenticationEvent,
        private navParams: NavParams
    ) {

    }

    ngOnInit() {
        this.title = 'Add class';
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
            .situationRepository
            .create(data)
            .subscribe(
                data => {
                    this.navCtrl.pop();
                },
                error => this.errorMessage = <any>error
            );
    }
}
