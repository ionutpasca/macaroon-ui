import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from '../shared/shared';

@Injectable()
export class HttpService extends Http {
	authService: any;
	constructor(backend: XHRBackend, options: RequestOptions, authService: AuthService) {
		let token = authService.getToken();
		options.headers.set('Authorization', token);
		super(backend, options);
		this.authService = authService;
	};

	request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
		let token = this.authService.getToken();
		if (typeof url === 'string') {
			if (!options) {
				const headers = new Headers();
				options = new RequestOptions({ headers: headers });
			}
			options.headers.set('Authorization', token);
			options.headers.set('Content-Type', 'application/json');
		} else {
			url.headers.set('Authorization', token);
			url.headers.set('Content-Type', 'application/json');
		}
		return super.request(url, options).catch(this.catchAuthError(this));
	};

	private catchAuthError(self: HttpService) {
		return (res: Response) => {
			console.log(res);
			if (res.status === 401 || res.status === 403) {
				console.log(res);
			}
			return Observable.throw(res);
		};
	}
};