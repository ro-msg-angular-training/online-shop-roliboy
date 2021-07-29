import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginCredentials, IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: ILoginCredentials): Observable<IUser> {
    console.log(environment.apiUrl);
    return this.httpClient.post<IUser>(
      `${environment.apiUrl}/login`,
      credentials
    );
  }
}
