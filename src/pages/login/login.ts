import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController, Loading, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { AuthService } from '../../shared/shared';
import { Register, Home } from '../pages';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class Login {
	loading: Loading;
	invalidCredentials = false;
	credentials = {};
	fbResponse: string = '';

	constructor(private navCtrl: NavController,
		private navParams: NavParams,
		private alertController: AlertController,
		private auth: AuthService,
		private loadingController: LoadingController,
		private fb: Facebook,
		private platform: Platform) { };

	ionViewDidLoad() {
		console.log('ionViewDidLoad Login');
		this.resetCredentials();
	};

	public createAccount() {
		this.navCtrl.push(Register);
	};

	public login() {
		this.invalidCredentials = false;
		this.showLoading();
		this.auth.login(this.credentials).subscribe(allowed => {
			if (allowed) {
				this.loading.dismiss();
				this.navCtrl.setRoot(Home);
			} else {
				console.log('Access Denied');
			}
		}, error => {
			console.log("Err", error);
			this.invalidCredentials = true;
			this.resetCredentials();
			this.loading.dismiss();
		});
	};

	resetCredentials() {
		this.credentials = { email: '', password: '' }
	};

	showLoading() {
		this.loading = this.loadingController.create({
			content: 'Please wait..'
		});
		this.loading.present();
	};

	async loginWithFb() {
		let permissions = ['public_profile', 'user_friends', 'email'];
		if (this.platform.is('cordova')) {
			try {
				this.showLoading();
				let loginResponse: FacebookLoginResponse = await this.fb.login(permissions);
				const accessToken = loginResponse.authResponse.accessToken;
				this.auth.loginWithFacebook(accessToken).subscribe(resp => {
					if (resp) {
						this.loading.dismiss();
						this.navCtrl.setRoot(Home);
					} else {
						console.log('Access Denied');
					}
				});
			} catch (error) {
				throw error;
			}
		} else {
			console.log('Please run me on mobile');
			return false;
		}
	};
};