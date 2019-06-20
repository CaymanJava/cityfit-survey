import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedinGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    const loggedIn = localStorage.getItem('access_token') != null;
    console.log(loggedIn);
    if (!loggedIn) {
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }

}
