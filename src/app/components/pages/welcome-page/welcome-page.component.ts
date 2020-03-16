import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-store.interface';
import { UserModel } from '../../../interfaces/user-model.interface';
import { Observable } from 'rxjs';
import { GetService } from 'src/app/services/client/get.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  user$: Observable<UserModel> = this.store.select(state => state.user);
  welcomeWallpaper: string;

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.welcomeWallpaper = this.GET.welcomeWallpaper;
    this.GET.checkUserSession().subscribe(
      (user) => {
        console.log(user);
      }
    );
  }
}
