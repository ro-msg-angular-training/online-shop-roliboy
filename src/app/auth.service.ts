import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRoot: string = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient
  ) { }

  login() {
    console.warn('not implemented')
  }
}
