import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { UsersService } from '../../../shared/shared';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'page-users',
	templateUrl: 'users.html',
})
export class Users {
	users: any = [];

	constructor(private navCtrl: NavController,
		private alertController: AlertController,
		private navParams: NavParams,
		private usersService: UsersService,
		private loadingController: LoadingController) { };

	ionViewDidLoad() {
		let loader = this.loadingController.create({
			content: 'Getting users..'
		});
		loader.present().then(() => {
			return this.usersService.getUsers().subscribe(data => {
				this.users = data;
				loader.dismiss();
			}, err => {
				console.log("ERR", err);
				loader.dismiss();
			});
		});
	};

	refreshAll(refresher) {
		this.usersService.getUsers().subscribe(data => {
			this.users = data;
			refresher.complete();
		});
	};

	removeUser(userId) {
		let loader = this.loadingController.create({
			content: 'Loading..'
		});
		loader.present().then(() => {
			this.usersService.removeUser(userId).subscribe(data => {
				_.remove(this.users, usr => {
					return usr.id === userId;
				});
				loader.dismiss();
			});
		});
	};

	openRemoveUserPrompt(event, user) {
		let confirm = this.alertController.create({
			title: '',
			message: `Are you sure you want to delete ${user.email}?`,
			buttons: [
				{
					text: 'No',
					handler: () => { }
				},
				{
					text: 'Yes',
					handler: () => { this.removeUser(user.id) }
				}
			]
		});
		confirm.present();
	};
};
