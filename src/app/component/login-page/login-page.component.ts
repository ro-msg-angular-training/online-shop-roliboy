import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthLogin } from 'src/app/store/action/auth.action';
import {
  selectAuthErrorMessage,
  selectHasAuthError,
} from 'src/app/store/reducer/auth.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hasAuthError$ = this.store.pipe(select(selectHasAuthError));
  authErrorMessage$ = this.store.pipe(select(selectAuthErrorMessage));

  loginForm = this.fb.group({
    // username: [''],
    // password: ['']
    username: ['doej'],
    password: ['password'],
    // username: ['blackj'],
    // password: ['12345678'],
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  onSubmit(): void {
    this.store.dispatch(new AuthLogin(this.loginForm.value));
  }
}
