import { NgModule } from '@angular/core';
import {
  Route,
  Routes,
  RouterModule
} from '@angular/router';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { SigninPageComponent } from './components/pages/signin-page/signin-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';


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
    component: SignupPageComponent
  },
  {
    path: 'signin',
    pathMatch: 'full',
    component: SigninPageComponent
  },
  {
    path: 'users/:user_id',
    pathMatch: 'full',
    component: UserPageComponent
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
