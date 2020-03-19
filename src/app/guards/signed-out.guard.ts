import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { map } from 'rxjs/operators';
import { UserModel } from '../interfaces/user-model.interface';
import { CanActivateReturn } from './_guard';
import { GetService } from '../services/client/get.service';
import { UtilityService } from '../services/utility.service';


@Injectable({
  providedIn: 'root'
})
export class SignedOutGuard implements CanActivate {
  constructor(
    private GET: GetService,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): CanActivateReturn {
    return this.GET.checkUserSession().pipe(
      map((you: UserModel) => {
        console.log({ you, route, state });
        if (you) {
          this.router.navigate(['/', 'users', you.id]);
          this.utilityService.showSuccessSnackbar(
            route.data.canActivateErrorMessage
          );
        }
        return !you;
      })
    );
  }
}
