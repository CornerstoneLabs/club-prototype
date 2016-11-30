import { ContactPage } from '../pages/contact/contact';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {MyApp} from './app.component';
import { NewsPage } from '../pages/news/news';
import { NewsWrapperPage } from '../pages/news/news-wrapper';
import { NgModule, ErrorHandler } from '@angular/core';
import { SituationPage } from '../pages/situation/situation';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule, JsonpModule } from '@angular/http';
import { NewsRepository } from '../repository/news.repository';
import { SituationRepository } from '../repository/situation.repository';
import { ApplicationSettings } from './app.settings';
import { AuthenticatedHttpClient } from '../http/authenticated-http-client';
import { AuthenticationManager } from '../http/authentication.manager';
import { AuthenticationEvent } from '../http/authentication.event';
import { Login } from '../pages/login/login';
import { LoginMount } from '../pages/login/login-mount';
import {NewsDetailPage} from "../pages/news/news-detail";
import {SituationWrapperPage} from "../pages/situation/situation-wrapper";
import {SituationDetailPage} from "../pages/situation/situation-detail";
import {UserRepository} from "../repository/user.repository";
import {WindowRef} from "./app.window_provider";
import {SocketManager} from "../http/socket.manager";
import {NewsCreatePage} from "../pages/news/news-create";
import {NewsEditPage} from "../pages/news/news-edit";
import {SituationCreatePage} from "../pages/situation/situation-create";
import {SituationEditPage} from "../pages/situation/situation-edit";

@NgModule({
	declarations: [
		MyApp,
		ContactPage,
		TabsPage,
		Login,
		LoginMount,
		NewsPage,
		NewsWrapperPage,
		NewsDetailPage,
		NewsCreatePage,
		NewsEditPage,
		SituationPage,
		SituationWrapperPage,
		SituationDetailPage,
		SituationCreatePage,
		SituationEditPage
	],
	imports: [
		IonicModule.forRoot(MyApp),
		HttpModule,
		JsonpModule
	],
	bootstrap: [
		IonicApp
	],
	entryComponents: [
		MyApp,
		ContactPage,
		TabsPage,
		Login,
		NewsPage,
		NewsWrapperPage,
		NewsDetailPage,
		NewsCreatePage,
		NewsEditPage,
		SituationPage,
		SituationWrapperPage,
		SituationDetailPage,
		SituationCreatePage,
		SituationEditPage
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		NewsRepository,
		SituationRepository,
		ApplicationSettings,
		AuthenticatedHttpClient,
		AuthenticationManager,
		AuthenticationEvent,
		UserRepository,
		WindowRef,
		SocketManager
	]
})
export class AppModule {}
