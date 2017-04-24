import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { User } from '../models/models';
import { UsersService, AuthService } from '../shared/shared';
import { Login, Admin, Home } from '../pages/pages';

@Component({
	templateUrl: 'app.html',
	providers: [
		UsersService
	]
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;
	FB_APP_ID: number = 1835099360148534;
	currentUser: User;

	pages: Array<{ title: string, component: any }>;

	constructor(private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private auth: AuthService,
		private storage: Storage,
		private fb: Facebook) {

		this.fb.browserInit(this.FB_APP_ID, 'v2.8');
		this.initializeApp();
	};

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.auth.isLoggedIn()
				.then(useIsLogged => {
					this.rootPage = useIsLogged ? Home : Login;
					this.currentUser = this.auth.getUserInfo();
					this.splashScreen.hide();
				})
				.catch(() => {
					this.rootPage = Login;
					this.splashScreen.hide();
				});
		});
	};

	openPage(page) {
		this.nav.setRoot(page.component);
	};

	goToAdmin() {
		this.nav.push(Admin);
	};

	logout() {
		this.auth.logout().subscribe(success => {
			this.nav.setRoot(Login);
		});
	};
};
