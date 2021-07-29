import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  AuthLogin,
  AuthLoginSuccess,
  EAuthActions,
} from 'src/app/store/action/auth.action';
import { selectAuthErrorMessage, selectHasAuthError } from 'src/app/store/reducer/auth.reducer';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hasAuthError$ = this.store.pipe(select(selectHasAuthError));
  authErrorMessage$ = this.store.pipe(select(selectAuthErrorMessage));
  userAuthenticatedSubscription$ = new Subscription();

  loginForm = this.fb.group({
    // username: [''],
    // password: ['']
    username: ['doej'],
    password: ['password'],
    // username: ['blackj'],
    // password: ['12345678'],
  });

  constructor(
    private store: Store<IAppState>,
    private location: Location,
    private fb: FormBuilder,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.userAuthenticatedSubscription$ = this.actionsSubject$
      .pipe(ofType<AuthLoginSuccess>(EAuthActions.AuthLoginSuccess))
      .subscribe(() => {
        this.userAuthenticatedSubscription$.unsubscribe();
        this.location.back();
      });
  }

  onSubmit(): void {
    this.store.dispatch(new AuthLogin(this.loginForm.value));
  }
}
