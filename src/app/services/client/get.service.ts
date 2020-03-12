import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as UserActions from '../../stores/actions/user.actions';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';

@Injectable({
  providedIn: 'root'
})
export class GetService extends ClientService {

  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
  ) {
    super(http);
  }

  checkSession() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: window.localStorage.getItem('hotspot-token') || ''
      }),
      withCredentials: true,
    };
    return this.http.get(this.API_PREFIX + '/users/check_session', httpOptions).pipe(
      map((response: any) => {
        if (response.online) {
          const action = UserActions.USER_UPDATE_ACTION(response.user);
          console.log(action);
          this.store.dispatch(action);
        }
        return response;
      })
    );
  }

  sign_out() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    return this.http.get(this.API_PREFIX + '/users/sign_out', httpOptions).pipe(
      map((response: any) => {
        this.store.dispatch(UserActions.USER_SIGNOUT_ACTION());
        return response;
      })
    );
  }

}
