import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getUser();

    if (currentUser) {
      if (route.data.role && !currentUser.roles.includes(route.data.role)) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}