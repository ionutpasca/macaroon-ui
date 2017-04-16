import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppSettings } from './shared';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
    currentUser: any = {};
    private usersData = {};
    private BASE_URL = AppSettings.API_ENDPOINT;

    constructor(private http: Http) { };

    getUsers(): Observable<any> {
        return this.http.get(`${this.BASE_URL}/users`)
            .map((response: Response) => {
                return response.json();
            });
    };

    getOneUserData(userId, forceRefresh: boolean = false): Observable<any> {
        if (!forceRefresh && this.usersData[userId]) {
            this.currentUser = this.usersData[userId];
            return Observable.of(this.currentUser);
        }

        let URL = `${this.BASE_URL}/users/${userId}`;
        return this.http.get(URL)
            .map((response: Response) => {
                this.usersData[userId] = response.json()[0];
                this.currentUser = this.usersData[userId];
                return this.currentUser;
            });
    };

    removeUser(userId): Observable<any> {
        let URL = `${this.BASE_URL}/users/${userId}`;
        return this.http.delete(URL)
            .map((response: Response) => {
                return response.json();
            });
    };
};