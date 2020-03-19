import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { GetService } from 'src/app/services/client/get.service';
import { Router } from '@angular/router';
import { USER_ACCOUNT_TYPES, EVENT_TYPES } from 'src/app/enums/all.enums';
import { SocketService } from 'src/app/services/socket.service';
import { NotificationActionPipe } from 'src/app/pipes/notification-action.pipe';
import { UtilityService } from 'src/app/services/utility.service';
import { getFullNotificationMessage } from 'src/app/_misc/chamber';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  isListening = false;
  you: UserModel;
  defaultIconUrl: string;
  USER_ACCOUNT_TYPES = USER_ACCOUNT_TYPES;

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private socketService: SocketService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.defaultIconUrl = this.GET.defaultIconUrl;
    this.store.select('you').subscribe((you: UserModel) => {
      this.you = you;
      if (!this.isListening) {
        this.isListening = true;
        this.startListeners();
      }
    });
  }

  startListeners() {
    // Tenant Events
    const tenantRequestSentEventName = `${this.you.id}:${EVENT_TYPES.HOME_LISTING_REQUEST_SENT}`;
    this.socketService.listen(tenantRequestSentEventName, (data) => {
      this.handleEvent(data);
    });

    const tenantRequestCanceledEventName = `${this.you.id}:${EVENT_TYPES.HOME_LISTING_REQUEST_CANCELED}`;
    this.socketService.listen(tenantRequestCanceledEventName, (data) => {
      this.handleEvent(data);
    });

    // Home Owner Events
    const tenantRequestAcceptedEventName = `${this.you.id}:${EVENT_TYPES.HOME_LISTING_REQUEST_ACCEPTED}`;
    this.socketService.listen(tenantRequestAcceptedEventName, (data) => {
      this.handleEvent(data);
    });

    const tenantRequestDeclinedEventName = `${this.you.id}:${EVENT_TYPES.HOME_LISTING_REQUEST_DECLINED}`;
    this.socketService.listen(tenantRequestDeclinedEventName, (data) => {
      this.handleEvent(data);
    });
  }

  handleEvent(data) {
    console.log(data);
    const message = getFullNotificationMessage(
      data.notification
    );
    if (message) {
      this.utilityService.showInfoSnackbar(message);
    }
  }
}
