import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { LoginCredentials, User } from 'src/app/model/user.model';

export enum AuthActionTypes {
  AuthLogin = '[auth] login',
  AuthLoginSuccess = '[auth] login success',
  AuthLoginError = '[auth] login failed',
}

export class AuthLogin implements Action {
  public readonly type = AuthActionTypes.AuthLogin;
  constructor(public payload: LoginCredentials) {}
}

export class AuthLoginSuccess implements Action {
  public readonly type = AuthActionTypes.AuthLoginSuccess;
  constructor(public payload: User) {}
}

export class AuthLoginError implements Action {
  public readonly type = AuthActionTypes.AuthLoginError;
  constructor(public payload: HttpErrorResponse) {}
}

export type AuthActions = AuthLogin | AuthLoginError | AuthLoginSuccess;
