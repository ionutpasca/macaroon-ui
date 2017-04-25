import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../shared/shared';
import { User } from '../../models/models';

import * as io from 'socket.io-client';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class Home {
	currentUser: User;
	socket: any;

	loggedUsers: any;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private auth: AuthService) {
	};

	ionViewDidLoad() {
		console.log('ionViewDidLoad Home');
		this.auth.getUserInfo().then(user => {
			this.currentUser = user;
			this.socket = io('http://localhost:8083');
			this.socket.on('give_data', () => {
				this.socket.emit('user_data', this.currentUser);
			});
			
			this.socket.emit('get_logged_users');
			this.socket.on('logged_users', (loggedUsers) => {
				console.log("LOGGED USERS", loggedUsers);
			});
		})
		.catch(err => {
			console.log('Error getting user info');
		});
	};

};
