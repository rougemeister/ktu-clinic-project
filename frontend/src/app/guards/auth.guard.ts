import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const allowedRoles = route.data['roles'] as string[] | undefined;
    return this.auth.user$.pipe(take(1), map(user => {
      if (!user) {
        this.router.navigate(['/login']);
        return false;
      }
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }));
  }
}
