import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as UserActions from '../../stores/actions/user.actions';
import { map, flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { UserState } from 'src/app/interfaces/user-state.interface';
import { of, Observable } from 'rxjs';

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

  checkUserSession(): Observable<UserState> {
    return this.store.select('user').pipe(
      flatMap((user: UserState) => {
        return !!user
          ? of(user)
          : this.checkSession().pipe(
              map((response) => {
                return response.user || null;
              })
            );
      })
    );
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
