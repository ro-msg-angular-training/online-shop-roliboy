import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import {
  AuthLogin,
  AuthLoginError,
  AuthLoginSuccess,
  AuthActions,
  AuthActionTypes,
} from '../action/auth.action';
import { ShowNotification } from '../action/notification.action';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _service: AuthService,
    private _store: Store,
    private _location: Location
  ) {}

  authLogin$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AuthLogin>(AuthActionTypes.AuthLogin),
      map((action) => action.payload),
      switchMap((credentials) =>
        this._service.login(credentials).pipe(
          switchMap((user) => {
            this._location.back();
            return of(new AuthLoginSuccess(user));
          }),
          catchError((error) => [
            new ShowNotification({
              title: 'Login Failed',
              content: 'invalid credentials',
              created: new Date().getTime(),
              timeout: 5000,
              type: 'danger',
            }),
            new AuthLoginError(error),
          ])
        )
      )
    );
  });
}
