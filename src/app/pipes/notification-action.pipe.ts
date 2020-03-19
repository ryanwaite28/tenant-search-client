import { Pipe, PipeTransform } from '@angular/core';
import { NOTIFICATION_TYPE } from '../enums/all.enums';
import { NotificationModel } from '../interfaces/notification.interface';
import { getFullNotificationMessage } from '../_misc/chamber';

@Pipe({
  name: 'notificationAction'
})
export class NotificationActionPipe implements PipeTransform {

  constructor() { }

  transform(notification: NotificationModel): any {
    return getFullNotificationMessage(notification);
  }
}
