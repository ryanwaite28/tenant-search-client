import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../../../interfaces/notification.interface';
import { UserModel } from '../../../../interfaces/user-model.interface';
import { GetService } from '../../../../services/client/get.service';
import { AppState } from '../../../../interfaces/app-store.interface';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-notifications-fragment',
  templateUrl: './user-notifications-fragment.component.html',
  styleUrls: ['./user-notifications-fragment.component.css']
})
export class UserNotificationsFragmentComponent implements OnInit {
  you: UserModel;
  notificationsList: NotificationModel[] = [];
  defaultIconUrl: string;
  didLoad = false;
  isEndOfResults = false;

  constructor(
    private GET: GetService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.defaultIconUrl = this.GET.defaultIconUrl;
    this.store.select('you').subscribe((you: UserModel) => {
      this.handleUserStoreChange(you);
    });
  }

  handleUserStoreChange(you: UserModel) {
    this.you = you;
    if (!this.didLoad) {
      this.didLoad = true;
      this.loadMoreNotifications();
    }
  }

  loadMoreNotifications() {
    const lastIndex = this.notificationsList.length - 1;
    const last = this.notificationsList[lastIndex];
    const minId = last ? last.id : null;

    this.GET.user_notifications(this.you.id, minId).subscribe(
      (response) => {
        console.log(response);
        this.isEndOfResults = response.notifications.length < 5;
        this.notificationsList.push(...response.notifications);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
