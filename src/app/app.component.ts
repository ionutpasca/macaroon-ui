import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { User } from '../models/models';
import { ChatRoomService, DomainsService, UsersService, AuthService } from '../shared/shared';
import { ChatPrivate, Login, Admin, Home } from '../pages/pages';

@Component({
	templateUrl: 'app.html',
	providers: [
		ChatRoomService,
		DomainsService
	]
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any;
	FB_APP_ID: number = 1835099360148534;
	currentUser: User;
	chatRooms: any;

	pages: Array<{ title: string, component: any }>;

	constructor(private events: Events,
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private auth: AuthService,
		private chatRoom: ChatRoomService,
		private storage: Storage,
		private fb: Facebook) {
		
		this.fb.browserInit(this.FB_APP_ID, 'v2.8');
		this.initializeApp();
	};

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.checkAuthentication()
				.then(() => {
					return this.initializeChatRooms(this.currentUser.id);
				})
				.then(() => this.splashScreen.hide())
				.catch(() => {
					this.rootPage = Login;
					this.splashScreen.hide();
				});
		});
	};

	async checkAuthentication() {
		try {
			const userIsLoggedIn = await this.auth.isLoggedIn();
			this.rootPage = userIsLoggedIn ? Home : Login;
			this.currentUser = await this.auth.getUserInfo();
			return true;
		} catch (error) {
			throw error;
		};
	};

	async initializeChatRooms(userId) {
		try {
			this.chatRoom.getChatRoomsForUser(userId).subscribe((response) => {
				console.log("CHAT ROOMS", response);
				this.chatRooms = response;
			});
			return true;
		} catch (error) {
			throw error;
		}
	};

	openPage(page) {
		this.nav.setRoot(page.component);
	};

	openChatRoom(receiver) {
		this.nav.push(ChatPrivate, { receiver: receiver, currentUser: this.currentUser });
	};

	goToAdmin() {
		this.nav.push(Admin);
	};

	logout() {
		this.auth.logout().subscribe(success => {
			this.events.publish('logOut:triggered');
			this.nav.setRoot(Login);
		});
	};
};
