import { Component } from '@angular/core';
import { PopoverController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Popover } from '../../../components/components';

import { DomainsService } from '../../../shared/shared';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'page-domains',
	templateUrl: 'domains.html',
})
export class Domains {

	domains: any = [];

	constructor(private navCtrl: NavController,
		private alertController: AlertController,
		private navParams: NavParams,
		private domainsService: DomainsService,
		private popoverCtrl: PopoverController,
		private loadingController: LoadingController,
		private elementRef: ElementRef) { };

	ionViewDidLoad() {
		console.log('ionViewDidLoad Domains');

		let loader = this.loadingController.create({
			content: 'Getting domains..'
		});
		loader.present().then(() => {
			return this.domainsService.getDomains().subscribe(data => {
				this.domains = data;
				loader.dismiss();
			}, err => {
				console.log("ERR", err);
				loader.dismiss();
			});
		});
	};


	refreshAll(refresher) {
		this.domainsService.getDomains().subscribe(data => {
			this.domains = data;
			refresher.complete();
		});
	};

	removeDomain(domainId) {
		let loader = this.loadingController.create({
			content: 'Loading..'
		});
		loader.present().then(() => {
			this.domainsService.removeDomain(domainId).subscribe(data => {
				_.remove(this.domains, usr => {
					return usr.id === domainId;
				});
				loader.dismiss();
			});
		});
	};

	domainPopover(event) {
		let popover = this.popoverCtrl.create(Popover);
		popover.present({
			ev: event
		});
	};

	openDomainPrompt(event, domain) {
		let confirm = this.alertController.create({
			title: '',
			message: `Are you sure you want to delete ${domain.name}?`,
			buttons: [
				{
					text: 'No',
					handler: () => { }
				},
				{
					text: 'Yes',
					handler: () => { this.removeDomain(domain.id) }
				}
			]
		});
		confirm.present();
	};

	openRemoveDomainPrompt(event, domain) {
		let confirm = this.alertController.create({
			title: '',

			buttons: [
				{
					text: 'Delete',
					handler: () => { this.openDomainPrompt(event, domain) }
				},
				{
					text: 'Update',
					handler: () => { }
				},
				{
					text: 'Cancel',
					handler: () => { }
				}


			]
		});
		confirm.present();
	};


};

