import { Events } from 'ionic-angular';
import { AppSettings } from './shared';

import * as io from 'socket.io-client';

export class Communicator {
	socket: any;

	constructor(private events: Events) {
		this.socket = io(AppSettings.SOCKET_ENDPOINT);
		this.events.subscribe('logOut:triggered', () => {
			try {
				this.socket.emit('forceDisconnect');
			} catch (err) {
				console.log("Socket uninitialized");
			}
		});
	};

	getSocket() {
		return  this.socket;
	};
};