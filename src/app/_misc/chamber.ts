import { ActivatedRouteSnapshot } from '@angular/router';
import { UserModel } from '../interfaces/user-model.interface';
import { NotificationModel } from '../interfaces/notification.interface';
import { NOTIFICATION_TYPE } from '../enums/all.enums';

export function getRouteParamKey(key: string, route: ActivatedRouteSnapshot, recursiveParent: boolean = false) {
  const value = route.params[key];
  if (value) {
    return value;
  }

  if (recursiveParent && route.parent) {
    return getRouteParamKey(key, route.parent, recursiveParent);
  } else {
    return null;
  }
}

export const getUserFullName = (user: UserModel) => {
  if (user) {
    const { first_name, middle_initial, last_name } = user;
    const middle = middle_initial
      ? ` ${middle_initial}. `
      : ` `;

    const displayName = `${first_name}${middle}${last_name}`;
    return displayName;
  } else {
    return '';
  }
};

export const getNotificationActionMessage = (notification: NotificationModel): string => {
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

export const getFullNotificationMessage = (notification: NotificationModel): string => {
  if (!notification) {
    console.warn(`No notification was given...`);
    return '';
  }
  const fromUserFullName = getUserFullName(notification.from);
  const message = getNotificationActionMessage(notification);
  const notificationMessage = `${fromUserFullName} ${message}`;
  return notificationMessage;
}