import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  constructor(private _actions$: Actions, private _store: Store) {}

  showNotification$ = createEffect(() =>
    this._actions$.pipe(
      ofType<ShowNotification>(NotificationActionTypes.ShowNotification),
      map((action) => action.payload),
      switchMap((notification) => {
        setTimeout(
          () =>
            this._store.dispatch(new ClearNotification(notification.created)),
          notification.timeout
        );
        return of(new ShowNotificationSuccess(notification));
      })
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
