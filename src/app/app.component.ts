import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

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

	pages: Array<{ title: string, component: any }>;

	constructor(private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private auth: AuthService,
		private storage: Storage) {
		this.initializeApp();
	};

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.useIsLoggedIn()
				.then(() => {
					this.splashScreen.hide();
				})
				.catch(() => {
					this.splashScreen.hide();
				});
		});
	};

	useIsLoggedIn() {
		return new Promise((resolve, reject) => {
			this.auth.isLoggedIn()
				.then(response => {
					this.rootPage = response ? Home : Login;
					resolve(true);
				})
				.catch(err => {
					this.rootPage = Login;
					reject(err);
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
