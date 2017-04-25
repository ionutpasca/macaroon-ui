import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { User } from '../models/models';
import { AppSettings } from './shared';

@Injectable()
export class AuthService {
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
        if (!credentials.email || !credentials.password) {
            return Observable.throw('Please insert credentials');
        }
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
    };

    public loginWithFacebook(accessToken): Observable<any> {
        const headers = this.headers;
        headers.append('Authorization', `Bearer ${accessToken}`);
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`${AppSettings.API_ENDPOINT}/login/facebook`, options)
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
    };

    public register(credentials): Observable<any> {
        if (!credentials.email || !credentials.password || !credentials.name) {
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

    public logout() {
        return Observable.create(observer => {
            observer.next(true);
            this.setToken('').then(() => {
                observer.complete();
            });
        });
    };

    public async setToken(newToken) {
        await this.storage.set('token', newToken);
        this.token = newToken;
    };

    public async setCurrentUser(user) {
        console.log("INTRU SA SETEZ", user);
        await this.storage.set('user', user);
    };

    public async getUserInfo(): Promise<User> {
        let user = await this.storage.get('user');
        return user;
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
};