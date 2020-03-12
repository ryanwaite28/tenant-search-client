import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from './client.service';
import { map } from 'rxjs/operators';
import * as UserActions from '../../stores/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';

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

  sign_up(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    return this.http.post(this.API_PREFIX + '/users', data, httpOptions).pipe(
      map((response: any) => {
        this.store.dispatch(UserActions.USER_SIGNUP_ACTION(response.user));
        return response;
      })
    );
  }

}
