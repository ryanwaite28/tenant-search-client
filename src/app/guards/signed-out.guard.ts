import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
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
export class SignedOutGuard implements CanActivate {
  constructor(
    private GET: GetService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): CanActivateReturn {
    return this.GET.checkUserSession().pipe(
      map((user) => {
        console.log({ user, route, state });
        if (user) {
          this.router.navigate(['/', 'users', user.id]);
        }
        return !user;
      })
    );
  }
}
