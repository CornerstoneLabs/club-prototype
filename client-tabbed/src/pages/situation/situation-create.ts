import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { SituationRepository } from '../../repository/situation.repository';
import { AuthenticationEvent } from '../../http/authentication.event';
import {SituationModel} from "../../model/situation.model";
import {DaySelectPage} from "../day-select/day-select";
import * as moment from 'moment';
import {LocationSelectPage} from "../location-select/location-select";
import {LocationRepository} from "../../repository/location.repository";
import {AdminSelectPage} from "../admin-select/admin-select";

class Teacher {
    public name: string;
}

class DayData {
    public day: number;
    public startTime: string;
    public endTime: string;
    public location: number;
    public admins: Array<Teacher>;

    constructor () {
        this.admins = new Array<Teacher>();
        this.location = null;
    }
}

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
    data: SituationModel;
    days: Array<DayData>;

    constructor(
        public navCtrl: NavController,
        private situationRepository: SituationRepository,
        private authenticationEvent: AuthenticationEvent,
        private navParams: NavParams,
        private locationRepository: LocationRepository
    ) {

    }

    ngOnInit() {
        this.title = 'Add class';
        this.content = '';
        this.published = false;
        this.data = new SituationModel(null, '', '');
        this.days = new Array<DayData>();
    }

    ngOnDestroy () {
        this.navParams.get('origin').getData();
    }

    chooseDay (dayData) {
        let opts = {
            animate: true,
            direction: 'forward'
        };

        let params = {
            origin: this,
            addDayCallback: (item) => {
                dayData.day = item;
            }
        };

        this
            .navCtrl
            .push(DaySelectPage, params, opts);
    }

    addDay () {
        let opts = {
            animate: true,
            direction: 'forward'
        };

        let params = {
            origin: this,
            addDayCallback: (item) => {
                //var day = this.momentAdapter.moment().day(item);
                this.addDayToData(item);
            }
        };

        this
            .navCtrl
            .push(DaySelectPage, params, opts);
    }

    selectLocation (dayItem) {
        let opts = {
            animate: true,
            direction: 'forward'
        };

        let params = {
            origin: this,
            select: (item) => {
                dayItem.location = item;
            }
        };

        this
            .navCtrl
            .push(LocationSelectPage, params, opts);
    }

    selectAdmins (dayItem) {
        let opts = {
            animate: true,
            direction: 'forward'
        };

        let params = {
            origin: this,
            select: (item) => {
                dayItem.admins.push(item);
            }
        };

        this
            .navCtrl
            .push(AdminSelectPage, params, opts);
    }

    addDayToData (day) {
        let newDay = new DayData();
        newDay.day = day;
        this.days.push(newDay);
    }

    dayName (day) {
        let result = moment().day(day.day);
        return result.format('dddd');
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
