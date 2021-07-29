import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ILoginCredentials, IUser } from 'src/app/model/user.model';

export enum EAuthActions {
  AuthLogin = '[auth] login',
  AuthLoginSuccess = '[auth] login success',
  AuthLoginError = '[auth] login failed',
}

export class AuthLogin implements Action {
  public readonly type = EAuthActions.AuthLogin;
  constructor(public payload: ILoginCredentials) {}
}

export class AuthLoginSuccess implements Action {
  public readonly type = EAuthActions.AuthLoginSuccess;
  constructor(public payload: IUser) {}
}

export class AuthLoginError implements Action {
  public readonly type = EAuthActions.AuthLoginError;
  constructor(public payload: HttpErrorResponse) {}
}

export type AuthActions = AuthLogin | AuthLoginError | AuthLoginSuccess;
