import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as UserActions from '../../stores/actions/user.actions';
import { map, flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { of, Observable } from 'rxjs';
import {
  SessionResponse,
  SignOutResponse,
  GetUserLocationPreferencesResponse,
  GetUserHomeListingResponse,
  GetUserHomeListingsResponse,
  GetHomeListingRequestsResponse
} from 'src/app/interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class GetService extends ClientService {

  defaultIconUrl: string;
  private sessionChecked = false;
  private session;

  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
  ) {
    super(http);
    this.defaultIconUrl = this.DOMAIN + '/_static/img/anon.png';
  }

  getSessionChecked(): boolean {
    return this.sessionChecked;
  }

  checkUserSession(): Observable<UserModel> {
    return this.store.select('you').pipe(
      flatMap((you: UserModel) => {
        return !!you
          ? of(you)
          : this.checkSession().pipe(
              map((response) => {
                return response.user || null;
              })
            );
      })
    );
  }

  checkSession(): Observable<SessionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: window.localStorage.getItem('hotspot-token') || ''
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/check_session';
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: SessionResponse) => {
        this.session = response;
        if (response.online) {
          const action = UserActions.USER_UPDATE_ACTION(response.user);
          this.store.dispatch(action);
          this.sessionChecked = true;
        }
        return response;
      })
    );
  }

  sign_out(): Observable<SignOutResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/sign_out';
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: SignOutResponse) => {
        this.store.dispatch(UserActions.USER_SIGNOUT_ACTION());
        return response;
      })
    );
  }

  user_location_preferences(id): Observable<GetUserLocationPreferencesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/location-preferences';
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: GetUserLocationPreferencesResponse) => {
        return response;
      })
    );
  }

  user_home_listings(id): Observable<GetUserHomeListingsResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/home-listings';
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: GetUserHomeListingsResponse) => {
        return response;
      })
    );
  }

  home_listing_by_id(id): Observable<GetUserHomeListingResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/home-listings/' + id;
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: GetUserHomeListingResponse) => {
        return response;
      })
    );
  }

  location_preferences_by_state(id, minId): Observable<GetUserLocationPreferencesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = minId
      ? this.API_PREFIX + '/home-listings/' + id + '/location-preferences-by-state/' + minId
      : this.API_PREFIX + '/home-listings/' + id + '/location-preferences-by-state';
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: GetUserLocationPreferencesResponse) => {
        return response;
      })
    );
  }

  location_preferences_by_state_and_city(id, minId): Observable<GetUserLocationPreferencesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = minId
      ? this.API_PREFIX + '/home-listings/' + id + '/location-preferences-by-state-and-city/' + minId
      : this.API_PREFIX + '/home-listings/' + id + '/location-preferences-by-state-and-city';
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: GetUserLocationPreferencesResponse) => {
        return response;
      })
    );
  }

  requests_by_home_listing_id(id): Observable<GetHomeListingRequestsResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/home-listings/' + id + '/requests';
    return this.http.get(endpoint, httpOptions).pipe(
      map((response: GetHomeListingRequestsResponse) => {
        return response;
      })
    );
  }
}
