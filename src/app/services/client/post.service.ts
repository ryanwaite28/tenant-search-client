import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from './client.service';
import { map } from 'rxjs/operators';
import * as UserActions from '../../stores/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { Observable } from 'rxjs';
import {
  SignUpResponse,
  PostUserLocationPreferenceResponse,
  PostUserHomeListingResponse
} from 'src/app/interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService extends ClientService {

  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
  ) {
    super(http);
  }

  sign_up(data): Observable<SignUpResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    return this.http.post(this.API_PREFIX + '/users', data, httpOptions).pipe(
      map((response: SignUpResponse) => {
        this.store.dispatch(UserActions.USER_SIGNUP_ACTION(response.user));
        return response;
      })
    );
  }

  create_location_preference(data, id): Observable<PostUserLocationPreferenceResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    return this.http.post(this.API_PREFIX + '/users/' + id + '/location-preferences', data, httpOptions).pipe(
      map((response: PostUserLocationPreferenceResponse) => {
        return response;
      })
    );
  }

  create_home_listing(formData, id): Observable<PostUserHomeListingResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    return this.http.post(this.API_PREFIX + '/users/' + id + '/home-listings', formData, httpOptions).pipe(
      map((response: PostUserHomeListingResponse) => {
        return response;
      })
    );
  }
}
