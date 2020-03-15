import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from './client.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { map } from 'rxjs/operators';
import { HomeListingModel } from 'src/app/interfaces/home-listing.interface';
import { LocationPreferenceModel } from 'src/app/interfaces/location-preference.interface';
import { Observable } from 'rxjs';
import {
  DeleteUserLocationPreferenceResponse, DeleteUserHomeListingResponse,

} from 'src/app/interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class DeleteService extends ClientService {
  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
  ) {
    super(http);
  }

  delete_location_preference(
    preference: LocationPreferenceModel,
    id: string | number
  ): Observable<DeleteUserLocationPreferenceResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/location-preferences/' + preference.id;
    return this.http.delete(endpoint, httpOptions).pipe(
      map((response: DeleteUserLocationPreferenceResponse) => {
        return response;
      })
    );
  }

  delete_home_listing(
    home: HomeListingModel,
    id: string | number
  ): Observable<DeleteUserHomeListingResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      withCredentials: true,
    };
    const endpoint = this.API_PREFIX + '/users/' + id + '/home-listings/' + home.id;
    return this.http.delete(endpoint, httpOptions).pipe(
      map((response: DeleteUserHomeListingResponse) => {
        return response;
      })
    );
  }
}
