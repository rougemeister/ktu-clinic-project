// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const role = this.authService.getRole();

    if (!this.authService.isLoggedIn() || (expectedRoles && !expectedRoles.includes(role))) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
