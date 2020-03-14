import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getRouteParamKey } from '../_misc/chamber';
import { AppState } from '../interfaces/app-store.interface';
import { UserState } from '../interfaces/user-state.interface';
import { UtilityService } from '../services/utility.service';
import { CanActivateReturn } from './_guard';
import { GetService } from '../services/client/get.service';


@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private GET: GetService,
    private utilityService: UtilityService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): CanActivateReturn {
    const canActivate = this.canActivate(route, state);
    return canActivate;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): CanActivateReturn {
    return this.GET.checkUserSession().pipe(
      map((user) => {
        const canActivate = this.handleCanActivate(user, route);
        return canActivate;
      })
    );
  }

  handleCanActivate(user: UserState, route: ActivatedRouteSnapshot) {
    const checkAuth = this.checkAuth(user, route);
    if (checkAuth) {
      return true;
    } else {
      const errorMessage =
        route.data.canActivateErrorMessage ||
        'You do not have permission to access this page.';
      this.utilityService.showErrorSnackbar(errorMessage);
      return false;
    }
  }

  checkAuth(user: UserState, route: ActivatedRouteSnapshot): boolean {
    if (!user) { return false; }
    const id = getRouteParamKey(route.data.authParamsProp, route, true);
    const userId = parseInt(id, 10);
    const youAreUser = userId === user.id;
    return youAreUser;
  }
}
