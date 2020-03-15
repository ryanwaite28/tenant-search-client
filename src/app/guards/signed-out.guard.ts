import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app-store.interface';
import { UserModel } from '../interfaces/user-model.interface';
import { CanActivateReturn } from './_guard';
import { GetService } from '../services/client/get.service';


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
      map((you: UserModel) => {
        console.log({ you, route, state });
        if (you) {
          this.router.navigate(['/', 'users', you.id]);
        }
        return !you;
      })
    );
  }
}
