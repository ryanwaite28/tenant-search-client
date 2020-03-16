import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { UserNotificationsFragmentComponent } from './components/fragments/user-page/user-notifications-fragment/user-notifications-fragment.component';
import { UserMessagesFragmentComponent } from './components/fragments/user-page/user-messages-fragment/user-messages-fragment.component';
import { TenantUserAuthGuard } from './guards/tenant-auth.guard';
import { UserHomeRequestsFragmentComponent } from './components/fragments/user-page/user-home-requests-fragment/user-home-requests-fragment.component';
import { HomeOwnerUserAuthGuard } from './guards/home-owner-auth.guard';
import { UserHomeListingsFragmentComponent } from './components/fragments/user-page/user-home-listings-fragment/user-home-listings-fragment.component';
import { UserTenantRequestsFragmentComponent } from './components/fragments/user-page/user-tenant-requests-fragment/user-tenant-requests-fragment.component';
import { UserLocationPreferencesFragmentComponent } from './components/fragments/user-page/user-location-preferences-fragment/user-location-preferences-fragment.component';
import { UserCreateHomeListingFragmentComponent } from './components/fragments/user-page/user-create-home-listing-fragment/user-create-home-listing-fragment.component';
import { UserHomeListingFragmentComponent } from './components/fragments/user-page/user-home-listing-fragment/user-home-listing-fragment.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';

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
    path: 'about',
    pathMatch: 'full',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    pathMatch: 'full',
    component: ContactPageComponent
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
      {
        path: 'notifications',
        component: UserNotificationsFragmentComponent,
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      {
        path: 'messages',
        component: UserMessagesFragmentComponent,
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      // Tenant
      {
        path: 'location-preferences',
        component: UserLocationPreferencesFragmentComponent,
        canActivate: [TenantUserAuthGuard],
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      {
        path: 'home-requests',
        component: UserHomeRequestsFragmentComponent,
        canActivate: [TenantUserAuthGuard],
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      // Home Owmer Routes
      {
        path: 'create-home-listing',
        component: UserCreateHomeListingFragmentComponent,
        canActivate: [HomeOwnerUserAuthGuard],
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      {
        path: 'home-listings',
        component: UserHomeListingsFragmentComponent,
        canActivate: [HomeOwnerUserAuthGuard],
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      {
        path: 'home-listings/:home_listing_id',
        component: UserHomeListingFragmentComponent,
        canActivate: [HomeOwnerUserAuthGuard],
        data: {
          authParamsProp: 'user_id',
          canActivateErrorMessage: `You do not have permission to access this page.`,
          canActivateErrorRedirect: ['/']
        },
      },
      {
        path: 'tenant-requests',
        component: UserTenantRequestsFragmentComponent,
        canActivate: [HomeOwnerUserAuthGuard],
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
