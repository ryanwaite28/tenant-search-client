import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from './client.service';
import { map } from 'rxjs/operators';
import {
  USER_SIGNIN_ACTION,
} from '../../stores/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { Observable } from 'rxjs';
import {
  SignInResponse,
  PutUserProfileSettingsResponse,
  PutUserProfileIconResponse,
  PutUserHomeListingResponse,
  PutUserHomeListingRequestResponse,
  PutUserPasswordResponse,
  MessageResponse
} from 'src/app/interfaces/responses.interface';

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

  sign_in(data): Observable<SignInResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users';
    return this.http.put(endpoint, data, httpOptions).pipe(
      map((response: SignInResponse) => {
        this.store.dispatch(USER_SIGNIN_ACTION(response.user));
        return response;
      })
    );
  }

  update_profile_settings(data, id): Observable<PutUserProfileSettingsResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/settings';
    return this.http.put(endpoint, data, httpOptions).pipe(
      map((response: PutUserProfileSettingsResponse) => {
        this.store.dispatch(USER_SIGNIN_ACTION(response.user));
        return response;
      })
    );
  }

  update_profile_icon(formData, id): Observable<PutUserProfileIconResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/icon';
    return this.http.put(endpoint, formData, httpOptions).pipe(
      map((response: PutUserProfileIconResponse) => {
        this.store.dispatch(USER_SIGNIN_ACTION(response.user));
        return response;
      })
    );
  }

  update_profile_password(data, id): Observable<PutUserPasswordResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/password';
    return this.http.put(endpoint, data, httpOptions).pipe(
      map((response: PutUserPasswordResponse) => {
        return response;
      })
    );
  }

  update_home_listing(formData, userId, homeId): Observable<PutUserHomeListingResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + userId + '/home-listings/' + homeId;
    return this.http.put(endpoint, formData, httpOptions).pipe(
      map((response: PutUserHomeListingResponse) => {
        return response;
      })
    );
  }

  set_request_accept_state(userId, requestId, state: 'decline' | 'accept'): Observable<PutUserHomeListingRequestResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + userId + '/home-listings-requests/' + requestId + '/' + state;
    return this.http.put(endpoint, {}, httpOptions).pipe(
      map((response: PutUserHomeListingRequestResponse) => {
        return response;
      })
    );
  }

  submit_password_reset_code(data): Observable<MessageResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    return this.http.put(this.API_PREFIX  + '/passwords/submit_password_reset_code', data, httpOptions).pipe(
      map((response: MessageResponse) => {
        return response;
      })
    );
  }
}
