import { Component } from '@angular/core';

import { NewsWrapperPage } from '../news/news-wrapper';
import { SituationPage } from '../situation/situation';
import { ContactPage } from '../contact/contact';
import {SocketManager} from "../../http/socket.manager";

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = NewsWrapperPage;
	tab2Root: any = SituationPage;
	tab3Root: any = SituationPage;
	tab4Root: any = ContactPage;

	constructor(private socketManager: SocketManager) {

	}

	ngOnInit() {

	}
}
