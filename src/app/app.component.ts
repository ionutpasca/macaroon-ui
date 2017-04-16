import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UsersService } from '../shared/shared';
import { Home, Admin } from '../pages/pages';

@Component({
	templateUrl: 'app.html',
	providers: [
		UsersService
	]
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = Home;

	pages: Array<{ title: string, component: any }>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		this.initializeApp();
	};

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	};

	openPage(page) {
		this.nav.setRoot(page.component);
	};

	goToAdmin() {
		this.nav.push(Admin);
	};
};
