import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginCredentials, IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRoot: string = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient
  ) { }

  login(credentials: ILoginCredentials): Observable<IUser> {
    return this.httpClient.post<IUser>(`${this.apiRoot}/login`, credentials)
  }
}
