import { Component } from '@angular/core';
import { SituationPage } from './situation';

@Component({
    templateUrl: 'situation-wrapper.html'
})
export class SituationWrapperPage {
    rootPage = SituationPage;
}
