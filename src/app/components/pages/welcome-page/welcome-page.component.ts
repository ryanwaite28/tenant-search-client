import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-store.interface';
import { UserState } from '../../../interfaces/user-state.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(state => state.user);

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

}
