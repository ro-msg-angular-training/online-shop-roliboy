import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, State, Store } from '@ngrx/store';
import { IUser } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { selectUser } from '../store/selector/auth.selector';
import { IAppState } from '../store/state/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  user?: IUser

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private authService: AuthService
  ) {
    this.store.pipe(select(selectUser)).subscribe(user => this.user = user)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.user) {
      if (route.data.role && !this.user.roles.includes(route.data.role)) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}