import { Injectable } from '@angular/core';
import { LoginCredentials, RefreshToken, TokenInfo } from './auth.model';
import { Config } from '../../shared/config/env.config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoggerService } from '@ngx-toolkit/logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenString = 'refresh_token';
  accessTokenString = 'access_token';

  private tokenEndpoint = '/tokens';
  private refreshEndpoint = '/tokens/refreshes';


  constructor(public http: HttpClient,
              private log: LoggerService,
              private router: Router) {
  }

  login(value: LoginCredentials): Observable<TokenInfo> {
    this.log.debug('Getting token', {value: value});
    return this.http.post(`${Config.API_URL}${this.tokenEndpoint}`, value)
      .pipe(map((response: TokenInfo) => {
        this.log.debug('Got token info', {response: response});
        return response;
      }));
  }

  refreshToken(): Observable<TokenInfo> {
    this.log.debug('Refreshing token');
    const request = new RefreshToken();
    request.refresh_token = localStorage.getItem(this.refreshTokenString);

    return this.http.post(`${Config.API_URL}${this.refreshEndpoint}`, request)
      .pipe(
        map((response: TokenInfo) => {
          return this.mapRefreshTokenResponse(response);
        }),
        catchError((error: any) => {
          return this.handleRefreshTokenError(error);
        })
      );
  }

  removeToken(): void {
    localStorage.removeItem(this.refreshTokenString);
    localStorage.removeItem(this.accessTokenString);
  }

  notAuthorizedError(initialError: any): boolean {
    return initialError && initialError.status === 401;
  }

  private handleRefreshTokenError(error: any) {
    this.log.debug('Error while refreshing token', {error: error});

    if (this.notAuthorizedError(error)) {
      this.log.debug('Redirect to login page');
      this.router.navigate(['/login']);
    }
    return throwError(error);
  }

  private mapRefreshTokenResponse(response: TokenInfo) {
    this.log.debug('Got token info', {response: response});
    return response;
  }

}
