import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
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
  you: UserModel;
  defaultIconUrl: string;
  USER_ACCOUNT_TYPES = USER_ACCOUNT_TYPES;

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.defaultIconUrl = this.GET.defaultIconUrl;
    this.store.select('you').subscribe((you: UserModel) => {
      this.you = you;
    });
  }

}
