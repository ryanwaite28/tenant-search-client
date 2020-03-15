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
import { UserModel } from '../interfaces/user-model.interface';
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
      map((you: UserModel) => {
        const canActivate = this.handleCanActivate(you, route);
        return canActivate;
      })
    );
  }

  handleCanActivate(you: UserModel, route: ActivatedRouteSnapshot) {
    const checkAuth = this.checkAuth(you, route);
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

  checkAuth(you: UserModel, route: ActivatedRouteSnapshot): boolean {
    if (!you) { return false; }
    const id = getRouteParamKey(route.data.authParamsProp, route, true);
    const userId = parseInt(id, 10);
    const youAreUser = userId === you.id;
    return youAreUser;
  }
}
