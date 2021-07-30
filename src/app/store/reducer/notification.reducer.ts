import { createSelector } from '@ngrx/store';
import {
  NotificationActions,
  NotificationActionTypes,
} from '../action/notification.action';
import { AppState } from '../state/app.state';
import {
  initialNotificationState,
  NotificationState,
} from '../state/notification.state';

export const notificationReducer = (
  state = initialNotificationState,
  action: NotificationActions
): NotificationState => {
  switch (action.type) {
    case NotificationActionTypes.ShowNotificationSuccess: {
      return {
        ...state,
        notifications: state.notifications.concat(action.payload),
      };
    }
    case NotificationActionTypes.ClearNotificationSuccess: {
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.created != action.payload),
      };
    }
    default:
      return state;
  }
};

const notificationState = (state: AppState) => state.notification;

export const selectNotifications = createSelector(
  notificationState,
  (state: NotificationState) => state.notifications
);
