import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { Domains, Home, Questions, Users, Admin, Register, Login } from '../pages/pages';
import { AuthService } from '../shared/shared';
import { HttpService } from '../providers/providers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		Admin,
		Domains,
		Home,
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
		Domains,
		Home,
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
		}
	]
})
export class AppModule { }
