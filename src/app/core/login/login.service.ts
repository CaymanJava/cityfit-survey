import { Injectable } from '@angular/core';
import { LoginCredentials } from './login.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { TokenInfo } from '../auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AuthService, private router: Router) {
  }

  login(value: LoginCredentials): Observable<TokenInfo> {
    return this.authService.login(value);
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

}
