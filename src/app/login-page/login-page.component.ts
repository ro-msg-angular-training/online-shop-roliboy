import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  })

  constructor(
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  onSubmit(): void {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      success => this.location.back(),
      error => alert(error)
    )
  }
}
