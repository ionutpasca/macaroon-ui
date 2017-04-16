import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Domains, Questions, Users } from '../../pages';

@IonicPage()
@Component({
	selector: 'page-admin',
	templateUrl: 'admin.html',
})
export class Admin {
	domainsTab = Domains;
	usersTab = Users;
	questionsTab = Questions;
	
	constructor(public navCtrl: NavController, public navParams: NavParams) { };

	ionViewDidLoad() {
		console.log('ionViewDidLoad Admin');
	};

	goHome() {
		this.navCtrl.popToRoot();
	};
};
