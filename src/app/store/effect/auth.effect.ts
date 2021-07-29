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
  EAuthActions,
} from '../action/auth.action';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _service: AuthService,
    private _store: Store
  ) {}

  authLogin$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AuthLogin>(EAuthActions.AuthLogin),
      map((action) => action.payload),
      switchMap((credentials) =>
        this._service.login(credentials).pipe(
          switchMap((user) => of(new AuthLoginSuccess(user))),
          catchError((error) => of(new AuthLoginError(error)))
        )
      )
    );
  });
}
