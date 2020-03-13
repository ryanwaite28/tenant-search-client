import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { SigninPageComponent } from './components/pages/signin-page/signin-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { UserSettingsFragmentComponent } from './components/fragments/user-page/user-settings-fragment/user-settings-fragment.component';
import { UserHomeFragmentComponent } from './components/fragments/user-page/user-home-fragment/user-home-fragment.component';
import { UserAuthGuard } from './guards/auth.guard';
import { SignedOutGuard } from './guards/signed-out.guard';
import { SignedInGuard } from './guards/signed-in.guard';
import { UserIconFragmentComponent } from './components/fragments/user-page/user-icon-fragment/user-icon-fragment.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomePageComponent
  },
  {
    path: 'welcome',
    pathMatch: 'full',
    component: WelcomePageComponent
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupPageComponent,
    canActivate: [SignedOutGuard],
    data: {
      canActivateErrorMessage: `You are already signed in.`,
    },
  },
  {
    path: 'signin',
    pathMatch: 'full',
    component: SigninPageComponent,
    canActivate: [SignedOutGuard],
    data: {
      canActivateErrorMessage: `You are already signed in.`,
    },
  },
  {
    path: 'users/:user_id',
    data: {
      authParamsProp: 'user_id',
    },
    component: UserPageComponent,
    canActivateChild: [UserAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UserHomeFragmentComponent,
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      {
        path: 'settings',
        component: UserSettingsFragmentComponent,
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      {
        path: 'icon',
        component: UserIconFragmentComponent,
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
    ]
  },

  /**
   * Unknown/Invalid Route Redirect
   */
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
