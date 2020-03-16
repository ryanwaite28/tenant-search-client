import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientService {
  DOMAIN: string;
  API_PREFIX: string;

  constructor(
    public http: HttpClient
  ) {
    const isProd = window.location.origin.includes('herokuapp'); // process.env.DEV_OR_PROD === 'PRODUCTION';
    this.DOMAIN = isProd ? 'https://rmw-tenant-search-client.herokuapp.com' : `http://localhost:8000`;
    const apiDomain = this.DOMAIN + '/main';
    this.API_PREFIX = apiDomain;
    console.log({ isProd, apiDomain });
  }
}
