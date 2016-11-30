import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { SituationRepository } from '../../repository/situation.repository';
import { SituationModel } from '../../model/situation.model';
import { AuthenticationEvent } from '../../http/authentication.event';

@Component({
    selector: 'page-situation-edit',
    templateUrl: 'situation-edit.html'
})
export class SituationEditPage {
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
        this.title = 'Situation';
        this.id = this.navParams.get('id');

        this.getData();

        let _this = this;
        this.authenticationEvent.onHasAuthenticated(()=> {
            _this.getData();
        });
    }

    getData () {
        this
            .situationRepository
            .get(this.id)
            .subscribe(
                data => this.data = data,
                error =>  this.errorMessage = <any>error
            );
    }

    save () {
        this
            .situationRepository
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
