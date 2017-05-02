import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPrivate } from './chat-private';

@NgModule({
	declarations: [
		ChatPrivate,
	],
	imports: [
		IonicPageModule.forChild(ChatPrivate),
	],
	exports: [
		ChatPrivate
	]
})
export class ChatPrivateModule { }
