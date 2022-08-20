import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(defaultTokenExpirationOffset): boolean {
    if (this.auth.loggedIn(defaultTokenExpirationOffset)) {
      return true;
    } else {
      this.router.navigate(['/', this.auth.localLoginUrl]);
      return false;
    }
  }
}
