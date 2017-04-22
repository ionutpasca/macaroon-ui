import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController, Loading, NavController, NavParams } from 'ionic-angular';

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

	constructor(private navCtrl: NavController,
		private navParams: NavParams,
		private alertController: AlertController,
		private auth: AuthService,
		private loadingController: LoadingController) { };

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
				this.showError('Access Denied');
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

	showError(text) {
		setTimeout(() => {
			this.loading.dismiss();
		});

		let alert = this.alertController.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	};
};
