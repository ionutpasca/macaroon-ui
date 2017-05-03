import { Component } from '@angular/core';

@Component({
	selector: 'chat-bubble',
	inputs: ['msg: message'],
	template: 
	`
	<div class="chatBubble">
		<img class="profile-pic {{msg.position}}" [src]="msg.img">
		<div class="chat-bubble {{msg.position}}">
			<div class="message">{{msg.message}}</div>
			<div class="message-detail">
				<span style="font-weight:bold;">{{msg.senderName}} </span>,
				<span>{{msg.date}}</span>
			</div>
		</div>
	</div>
	`
})
export class ChatBubble {
	constructor() { }
};