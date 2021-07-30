import { Action } from '@ngrx/store';
import { Notification } from 'src/app/model/notification.model';

export enum NotificationActionTypes {
  ShowNotification = '[notification] show',
  ShowNotificationSuccess = '[notification] show success',
  ClearNotification = '[notification] clear',
  ClearNotificationSuccess = '[notification] clear success',
}

export class ShowNotification implements Action {
  public readonly type = NotificationActionTypes.ShowNotification;
  constructor(public payload: Notification) {}
}

export class ShowNotificationSuccess implements Action {
  public readonly type = NotificationActionTypes.ShowNotificationSuccess;
  constructor(public payload: Notification) {}
}

export class ClearNotification implements Action {
  public readonly type = NotificationActionTypes.ClearNotification;
  constructor(public payload: number) {}
}

export class ClearNotificationSuccess implements Action {
  public readonly type = NotificationActionTypes.ClearNotificationSuccess;
  constructor(public payload: number) {}
}

export type NotificationActions =
  | ShowNotification
  | ShowNotificationSuccess
  | ClearNotification
  | ClearNotificationSuccess;
