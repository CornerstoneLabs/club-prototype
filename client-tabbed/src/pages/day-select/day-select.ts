import { Component } from '@angular/core';
import {NavParams, ViewController, NavController} from 'ionic-angular';

@Component({
    templateUrl: 'day-select.html'
})
export class DaySelectPage {
    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        private navParams: NavParams
    ) {
    }

    dismiss () {

    }

    select (day) {
        this.navParams.get('addDayCallback')(day);
        this.navCtrl.pop();
    }
}
