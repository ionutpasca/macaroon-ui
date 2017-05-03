import { AppSettings } from './shared';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../providers/providers';

import 'rxjs/add/operator/map';

@Injectable()
export class ChatRoomService {
	private BASE_URL = AppSettings.API_ENDPOINT;

	constructor(private http: HttpService) { };

	getChatRoom(firstUserId: number, secondUserId: number): Observable<any> {
		const URL = `${this.BASE_URL}/chat_rooms/${firstUserId}/${secondUserId}`;
		return this.http.get(URL)
			.map((response: Response) => {
				return response.json();
			});
	};

	getChatRoomsForUser(userId: number): Observable<any> {
		const URL = `${this.BASE_URL}/chat_rooms/${userId}`;
		return this.http.get(URL)
			.map((response: Response) => {
				return response.json();
			});
	};

	sendMessage(chatRoomId: number, chatBody: string, sendingDate: any): Observable<any> {
		const URL = `${this.BASE_URL}/chat_rooms/${chatRoomId}`;
		const dataToSend = {
			message: chatBody,
			date: sendingDate
		};
		return this.http.post(URL, JSON.stringify(dataToSend))
			.map((response: Response) => {
				return response.json();
			});
	};
};
