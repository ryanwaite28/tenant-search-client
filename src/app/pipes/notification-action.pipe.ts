import { Pipe, PipeTransform } from '@angular/core';
import { NOTIFICATION_TYPE } from '../enums/all.enums';
import { NotificationModel } from '../interfaces/notification.interface';

@Pipe({
  name: 'notificationAction'
})
export class NotificationActionPipe implements PipeTransform {

  transform(notification: NotificationModel): any {
    switch (notification.action) {
      case NOTIFICATION_TYPE.HOME_LISTING_REQUEST_ACCEPTED: {
        return `accepted your tenant request for home listing: ${notification.target_id}`;
      }
      case NOTIFICATION_TYPE.HOME_LISTING_REQUEST_DECLINED: {
        return `declined your tenant request for home listing: ${notification.target_id}`;
      }
      case NOTIFICATION_TYPE.HOME_LISTING_REQUEST_SENT: {
        return `sent you a tenant for home listing: ${notification.target_id}`;
      }
      case NOTIFICATION_TYPE.HOME_LISTING_REQUEST_CANCELED: {
        return `canceled their tenant request for home listing: ${notification.target_id}`;
      }

      default: {
        return notification.action;
      }
    }
  }

}
