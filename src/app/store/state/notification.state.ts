import { Notification } from 'src/app/model/notification.model';

export interface NotificationState {
  notifications: Notification[];
}

export const initialNotificationState: NotificationState = {
  notifications: [],
};
