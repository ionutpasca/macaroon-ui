import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Events, IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { ChatPrivate, Domains, Home, Questions, Users, Admin, Register, Login } from '../pages/pages';
import { AuthService, Communicator } from '../shared/shared';
import { HttpService } from '../providers/providers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatBubble, Popover } from '../components/components';

@NgModule({
	declarations: [
		MyApp,
		Admin,
		ChatBubble,
		ChatPrivate,
		Domains,
		Home,
		Popover,
		Questions,
		Users,
		Register,
		Login
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		Admin,
		ChatBubble,
		ChatPrivate,
		Domains,
		Home,
		Popover,
		Questions,
		Users,
		Register,
		Login
	],
	providers: [
		AuthService,
		StatusBar,
		Facebook,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{
			provide: HttpService,
			useFactory: (backend: XHRBackend, options: RequestOptions, authService: AuthService) => {
				return new HttpService(backend, options, authService);
			},
			deps: [XHRBackend, RequestOptions, AuthService]
		},
		{
			provide: Communicator,
			useFactory: (events: Events) => {
				return new Communicator(events);
			},
			deps: [Events]
		}
	]
})
export class AppModule { }
