import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { User } from '../models/models';
import { AppSettings } from './shared';

@Injectable()
export class AuthService {
    private currentUser: User;
    private token: string;
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http, private storage: Storage) {
        if (!this.token) {
            this.storage.get('token').then(token => {
                this.token = token;
            });
        }
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    };

    public login(credentials): Observable<any> {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw('Please insert credentials');
        }
        else {
            credentials.username = credentials.email;
            return this.http.post(`${AppSettings.API_ENDPOINT}/login`, JSON.stringify(credentials), this.options)
                .map((response: Response) => {
                    const data = response.json();
                    return Promise.all([
                        this.setToken(data.token),
                        this.setCurrentUser(data.userInfo)
                    ]);
                })
                .map(() => {
                    return true;
                });
        }
    };

    public register(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw('Please insert credentials');
        }
        else {
            return this.http.post(`${AppSettings.API_ENDPOINT}/register`, JSON.stringify(credentials), this.options)
                .map((response: Response) => {
                    const data = response.json();
                    return Promise.all([
                        this.setToken(data.token),
                        this.setCurrentUser(data.userInfo)
                    ]);
                })
                .map(() => {
                    return true;
                })
        }
    };

    public async setToken(newToken) {
        await this.storage.set('token', newToken);
        this.token = newToken;
    };

    public async setCurrentUser(user) {
        await this.storage.set('user', user);
        this.currentUser = user;
    };

    public getUserInfo(): User {
        return this.currentUser;
    };

    public getToken() {
        return this.token;
    };

    public async isLoggedIn() {
        if (this.token) {
            return true;
        }
        const token = await this.storage.get('token');
        return token ? true : false;
    };

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            this.setToken('').then(() => {
                observer.complete();
            });
        });
    };
};
