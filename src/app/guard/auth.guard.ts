import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectUser } from '../store/reducer/auth.reducer';
import { AppState } from '../store/state/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectUser),
      map((user) => {
        if (!user) {
          this.router.navigate(['login']);
          return false;
        }
        if (route.data.role && !user.roles.includes(route.data.role)) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
