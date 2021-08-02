import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import {
  ClearNotification,
  ClearNotificationSuccess,
  NotificationActionTypes,
  ShowNotification,
  ShowNotificationSuccess,
} from '../action/notification.action';

@Injectable()
export class NotificationEffects {
  constructor(private _actions$: Actions) {}

  showNotification$ = createEffect(() =>
    this._actions$.pipe(
      ofType<ShowNotification>(NotificationActionTypes.ShowNotification),
      map((action) => action.payload),
      mergeMap((notification) => merge(
        of(new ClearNotification(notification.created)).pipe(delay(notification.timeout)),
        of(new ShowNotificationSuccess(notification))
      ))
    )
  );

  clearNotifications$ = createEffect(() =>
    this._actions$.pipe(
      ofType<ClearNotification>(NotificationActionTypes.ClearNotification),
      map((action) => action.payload),
      switchMap((created) => of(new ClearNotificationSuccess(created)))
    )
  );
}
