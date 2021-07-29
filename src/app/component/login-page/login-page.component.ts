import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthLogin } from 'src/app/store/action/auth.action';
import {
  selectAuthErrorMessage,
  selectHasAuthError,
  selectIsUserAuthenticated,
} from 'src/app/store/selector/auth.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hasAuthError$ = this.store.pipe(select(selectHasAuthError));
  authErrorMessage$ = this.store.pipe(select(selectAuthErrorMessage));

  loginForm = this.fb.group({
    // username: [''],
    // password: ['']
    // username: ['doej'],
    // password: ['password']
    username: ['blackj'],
    password: ['12345678'],
  });

  constructor(
    private store: Store<IAppState>,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectIsUserAuthenticated))
      .subscribe((authenticated) => {
        if (authenticated) this.location.back();
      });
  }

  onSubmit(): void {
    this.store.dispatch(new AuthLogin(this.loginForm.value));
  }
}
