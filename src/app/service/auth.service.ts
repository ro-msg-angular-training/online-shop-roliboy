import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRoot: string = 'http://localhost:3000'
  private user: User | null = null

  constructor(
    private httpClient: HttpClient
  ) { }

  login(username: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      this.httpClient.post<User>(`${this.apiRoot}/login`, {username, password}).subscribe(
        user => {
          this.user = user
          observer.next(user)
          observer.complete()
        },
        error => {
          observer.error("login failed")
        }
      )
    })
  }

  getUser(): User | null {
    return this.user
  }

  isAdmin(): boolean {
    if (this.user == null)
      return false
    return this.user.roles.includes('admin')
  }

  isCustomer(): boolean {
    if (this.user == null)
      return false
    return this.user.roles.includes('customer')
  }
}
