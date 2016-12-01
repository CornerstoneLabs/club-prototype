///<reference path="../../repository/user.repository.ts"/>
import { Component } from '@angular/core';
import {NavParams, ViewController, NavController} from 'ionic-angular';
import {UserRepository} from "../../repository/user.repository";
import {UserModel} from "../../model/user.model";

@Component({
    templateUrl: 'admin-select.html'
})
export class AdminSelectPage {
    public errorMessage: string;
    public data: Array<UserModel>;

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        private navParams: NavParams,
        private userRepository: UserRepository
    ) {
    }

    ngOnInit() {
        this.getData();
    }


    dismiss () {

    }

    select (item) {
        this.navParams.get('select')(item);
        this.navCtrl.pop();
    }

    getData () {
        this.userRepository
            .all()
            .subscribe(
                data => this.data = data,
                error =>  this.errorMessage = <any>error);
    }
}
