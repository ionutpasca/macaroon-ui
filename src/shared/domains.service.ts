import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AppSettings } from './shared';
import { HttpService } from '../providers/providers';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DomainsService {
    currentDomain: any = {};
    private domainsData = {};
    private BASE_URL = AppSettings.API_ENDPOINT;

    constructor(private http: HttpService) { };

    getDomains(): Observable<any> {
        return this.http.get(`${this.BASE_URL}/domains`)
            .map((response: Response) => {
                return response.json();
            });
    };

    getOneDomainData(domainId, forceRefresh: boolean = false): Observable<any> {
        if (!forceRefresh && this.domainsData[domainId]) {
            this.currentDomain = this.domainsData[domainId];
            return Observable.of(this.currentDomain);
        }

        let URL = `${this.BASE_URL}/domains/${domainId}`;
        return this.http.get(URL)
            .map((response: Response) => {
                this.domainsData[domainId] = response.json()[0];
                this.currentDomain = this.domainsData[domainId];
                return this.currentDomain;
            });
    };

    removeDomain(domainId): Observable<any> {
        let URL = `${this.BASE_URL}/domains/${domainId}`;
        return this.http.delete(URL)
            .map((response: Response) => {
                return response.json();
            });
    };
};