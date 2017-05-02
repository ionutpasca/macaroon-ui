import { getCurrentDebugContext } from '@angular/core/src/view/services';
import { Component, NgZone, ApplicationRef } from '@angular/core';
import { Events, IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { AuthService, Communicator } from '../../shared/shared';
import { User, PublicUser } from '../../models/models';
import { ChatPrivate } from '../pages';

import * as _ from 'lodash';
import * as io from 'socket.io-client';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class Home {
	currentUser: User;
	socket: any;
	ngZone: NgZone;
	loggedUsers: Array<PublicUser>;

	constructor(private events: Events,
		private navCtrl: NavController,
		private navParams: NavParams,
		private auth: AuthService,
		private applicationRef: ApplicationRef,
		private loadingController: LoadingController,
		private communicator: Communicator) {
		this.events.subscribe('logOut:triggered', () => {
			try {
				this.socket.emit('forceDisconnect');
			} catch (err) {
				console.log("Socket uninitialized");
			}
		});
		this.socket = this.communicator.getSocket();
	};

	ionViewDidLoad() {
		console.log('ionViewDidLoad Home');
		this.auth.getUserInfo().then(user => {
			this.currentUser = user;
			this.socket.emit('user_data', this.currentUser);

			this.socket.on('user:new', user => {
				const userAlreadyIn = _.find(this.loggedUsers, { id: user.id });
				if (!userAlreadyIn) {
					this.loggedUsers.push(user);
					this.applicationRef.tick();
				}
			});

			this.socket.emit('get_logged_users', user);
			this.socket.on('logged_users', (loggedUsers) => {
				this.loggedUsers = loggedUsers;
			});

			this.socket.on('user:disconnected', (disconnectedUser) => {
				_.remove(this.loggedUsers, { id: disconnectedUser.id });
				this.applicationRef.tick();
			});
		})
			.catch(err => {
				console.log('Error getting user info');
			});
	};

	openChatRoom(receiver) {
		this.navCtrl.push(ChatPrivate, { receiver: receiver, currentUser: this.currentUser });
	};
};
