import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app-store.interface';
import { UserState } from '../interfaces/user-state.interface';
import { CanActivateReturn } from './_guard';
import { GetService } from '../services/client/get.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignedInGuard implements CanActivate, CanActivateChild {
  constructor(
    private GET: GetService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): CanActivateReturn {
    return this.canActivate(route, state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): CanActivateReturn {
    return this.GET.checkUserSession().pipe(
      map((user) => {
        console.log({ user, route, state });
        return !!user;
      })
    );

    // return this.store.select('user')
    //   .pipe(
    //     flatMap((you: UserState) => {
    //       // return this.handleCanActivate(you, route);
    //       const isSignedIn = !!you;
    //       return isSignedIn
    //         ? of(true)
    //         : this.GET.checkSession().pipe(
    //           map((response) => {
    //             console.log(response);
    //             return response.online;
    //           })
    //         );
    //     }),
    //     flatMap((result: boolean) => {
    //       console.log({ result });
    //       return of(result);
    //     })
    //   );
  }
}
