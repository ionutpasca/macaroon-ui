import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Domains } from './domains';

@NgModule({
	declarations: [
		Domains,
	],
	imports: [
		IonicPageModule.forChild(Domains),
	],
	exports: [
		Domains
	]
})
export class DomainsModule { }
