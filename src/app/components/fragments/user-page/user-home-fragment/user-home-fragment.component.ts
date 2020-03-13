import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/interfaces/user-state.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { GetService } from 'src/app/services/client/get.service';
import { Router } from '@angular/router';
import { USER_ACCOUNT_TYPES } from 'src/app/enums/all.enums';

@Component({
  selector: 'app-user-home-fragment',
  templateUrl: './user-home-fragment.component.html',
  styleUrls: ['./user-home-fragment.component.css']
})
export class UserHomeFragmentComponent implements OnInit {
  user: UserState;
  USER_ACCOUNT_TYPES = USER_ACCOUNT_TYPES;

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.user = state.user;
    });
  }

}
