import { visitSiblingRenderNodes } from '@angular/core/src/view/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatRoomService, AppSettings, Communicator } from '../../../shared/shared';
import { User, ChatMessage } from '../../../models/models';

import * as _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-chat-private',
	templateUrl: 'chat-private.html'
})
export class ChatPrivate {
	message: string;
	chatRoomId: number;
	receiver: User;
	currentUser: User;
	socket: any;
	messages: Array<ChatMessage>;

	constructor(private navCtrl: NavController,
		private navParams: NavParams,
		private chatRoom: ChatRoomService,
		private communicator: Communicator) {

		this.messages = new Array<ChatMessage>();
		this.socket = this.communicator.getSocket();
		this.currentUser = navParams.get('currentUser');
		this.receiver = navParams.get('receiver');

		this.socket.on('new_message_received', (message) => {
			this.treatNewMessage(message);
		});
	};

	ionViewDidLoad() {
		this.chatRoom.getChatRoom(this.currentUser.id, this.receiver.id)
			.subscribe((response) => {
				this.chatRoomId = response.id;
				if (response.messages && response.messages.length) {
					this.messages = this.mapChatResponseToModel(response);
				}
			});
	};

	mapChatResponseToModel(chatRoomResponse) {
		const messages = chatRoomResponse.messages;
		return _.map(messages, (message) => {
			let receiverImage = this.receiver.profileImageUrl ? this.receiver.profileImageUrl : AppSettings.DEFAULT_PROFILE_IMAGE;
			const senderName = message.sender === this.receiver.id ? this.receiver.name : this.currentUser.name;
			const img = message.sender === this.receiver.id ? receiverImage : this.currentUser.profileImageUrl;

			const msgPosition = message.sender === this.receiver.id ? 'left' : 'right';
			return new ChatMessage(senderName, message.message, message.sending_date, msgPosition, img);
		});
	};

	sendMessage() {
		const now = new Date();
		const sendingDate = moment(now).calendar().toString();
		const chatMessage = new ChatMessage(this.currentUser.name, this.message, sendingDate, 'right', this.currentUser.profileImageUrl);
		this.messages.push(chatMessage);

		this.chatRoom.sendMessage(this.chatRoomId, this.message, now)
			.subscribe(response => {
				this.emitMessageToSender(this.message, now);
				this.message = null;
			});
	};

	emitMessageToSender(message, date) {
		this.socket.emit('new_message', { toUserId: this.receiver.id, message: this.message, date: date });
	};

	treatNewMessage(message) {
		const senderImage = this.receiver.profileImageUrl ? this.receiver.profileImageUrl : AppSettings.DEFAULT_PROFILE_IMAGE;
		const date = moment(message.date).calendar().toString();
		const newMsg = new ChatMessage(this.receiver.name, message.message, date, 'left', senderImage);
		this.messages.push(newMsg);
	};
};