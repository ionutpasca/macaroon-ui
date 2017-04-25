import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../shared/shared';
import { User } from '../../models/models';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class Home {
	currentUser: User;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private auth: AuthService) {
	};

	ionViewDidLoad() {
		console.log('ionViewDidLoad Home');
		this.auth.getUserInfo().then(user => {
			this.currentUser = user;
		})
	};

};
