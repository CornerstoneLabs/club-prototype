///<reference path="../../repository/location.repository.ts"/>
import { Component } from '@angular/core';
import {NavParams, ViewController, NavController} from 'ionic-angular';
import {LocationRepository} from "../../repository/location.repository";
import {LocationModel} from "../../model/location.model";

@Component({
    templateUrl: 'location-select.html'
})
export class LocationSelectPage {
    public errorMessage: string;
    public data: Array<LocationModel>;

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        private navParams: NavParams,
        private locationRepository: LocationRepository
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
        this.locationRepository
            .all()
            .subscribe(
                data => this.data = data,
                error =>  this.errorMessage = <any>error);
    }
}
