import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/interfaces/user-state.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { GetService } from 'src/app/services/client/get.service';
import { Router } from '@angular/router';
import { USER_ACCOUNT_TYPES } from 'src/app/enums/all.enums';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user: UserState;
  defaultIconUrl: string;
  USER_ACCOUNT_TYPES = USER_ACCOUNT_TYPES;

  get displayName(): string {
    if (this.user) {
      const { first_name, middle_initial, last_name } = this.user;
      const middle = middle_initial
        ? ` ${middle_initial}. `
        : ` `;

      const displayName = `${first_name}${middle}${last_name}`;
      return displayName;
    } else {
      return '';
    }
  }

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.defaultIconUrl = this.GET.defaultIconUrl;
    this.store.subscribe(state => {
      this.user = state.user;
    });
  }

}
