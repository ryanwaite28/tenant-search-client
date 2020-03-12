import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientService {
  API_PREFIX: string;

  constructor(
    public http: HttpClient
  ) {
    const isProd = window.location.origin.includes('herokuapp'); // process.env.DEV_OR_PROD === 'PRODUCTION';
    const api_domain = isProd ? 'https://rmw-hotspot-server.herokuapp.com/main' : `http://localhost:8000/main`;
    this.API_PREFIX = api_domain;
    console.log({ isProd, api_domain });
  }
}
