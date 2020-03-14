import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from './client.service';
import { map } from 'rxjs/operators';
import {
  USER_SIGNIN_ACTION,
} from '../../stores/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';

@Injectable({
  providedIn: 'root'
})
export class PutService extends ClientService {

  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
  ) {
    super(http);
  }

  sign_in(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users';
    return this.http.put(endpoint, data, httpOptions).pipe(
      map((response: any) => {
        this.store.dispatch(USER_SIGNIN_ACTION(response.user));
        return response;
      })
    );
  }

  update_profile_settings(data, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/settings';
    return this.http.put(endpoint, data, httpOptions).pipe(
      map((response: any) => {
        this.store.dispatch(USER_SIGNIN_ACTION(response.user));
        return response;
      })
    );
  }

  update_profile_icon(formData, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/icon';
    return this.http.put(endpoint, formData, httpOptions).pipe(
      map((response: any) => {
        this.store.dispatch(USER_SIGNIN_ACTION(response.user));
        return response;
      })
    );
  }

  update_home_listing(formData, userId, homeId) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + userId + '/home-listings/' + homeId;
    return this.http.put(endpoint, formData, httpOptions).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
