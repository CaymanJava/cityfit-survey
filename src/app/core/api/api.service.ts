import { Injectable } from '@angular/core';
import { PageableParams } from './api.model';
import { TokenInfo } from '../login';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '@ngx-toolkit/logger';

export * from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public authService: AuthService, public http: HttpClient, private log: LoggerService) {
  }

  get(url: string, pageableParams?: PageableParams, filterParams?: any): Observable<any> {
    return this.processAPIRequest(url, 'GET', {}, pageableParams, filterParams);
  }

  post(url: string, data: any): Observable<any> {
    return this.processAPIRequest(url, 'POST', data);
  }

  private setPageableParams(httpParams: HttpParams, pageableParams?: PageableParams) {
    if (typeof pageableParams !== 'undefined') {
      if (pageableParams.sort) {
        httpParams.set('sort', `${pageableParams.sort.order},${pageableParams.sort.direction}`);
      }
      if (pageableParams.sortArray) {
        pageableParams.sortArray.forEach(sort => {
          httpParams.append('sort', `${sort.order},${sort.direction}`);
        });
      }

      const pageableParamsSource: any = pageableParams;
      ['page', 'size'].forEach(key => {
        if (pageableParamsSource.hasOwnProperty(key)) {
          httpParams.set(key, `${pageableParamsSource[key]}`);
        }
      });
    }
  }

  private setFilterParams(httpParams: HttpParams, filterParams?: any) {
    if (typeof filterParams !== 'undefined') {
      Object.keys(filterParams).map(key => {
        const value = filterParams[key];
        if (null != value && '' !== value) {
          httpParams.set(key, `${value}`);
        }
      });
    }
  }

  private processAPIRequest(url: string, method: string, data?: any, pageableParams?: PageableParams, filterParams?: any): Observable<any> {
    return this.callAPI(url, method, data, pageableParams, filterParams)
      .pipe(
        catchError(initialError => {
          if (this.notAuthorizedError(initialError)) {
            return this.refreshTokenAndRetryRequest(url, method, data, pageableParams, filterParams);
          }
          return throwError(initialError);
        }));
  }

  private refreshTokenAndRetryRequest(url: string, method: string, data?: any,
                                      pageableParams?: PageableParams, filterParams?: any): Observable<Response> {
    return this.authService.refreshToken()
      .pipe(
        flatMap((tokenInfo: TokenInfo) => {
          this.saveTokensInStorage(tokenInfo);
          return this.callAPI(url, method, data, pageableParams, filterParams);
        }));
  }

  private callAPI(url: string, method: string, data?: any, pageableParams?: PageableParams, filterParams?: any): Observable<any> {
    return this.getResponse(url, method, data, pageableParams, filterParams);
  }

  private getResponse(url: string, method: string, data?: any,
                      pageableParams?: PageableParams, filterParams?: any): Observable<HttpResponse<any>> {
    switch (method) {
      case 'GET':
        const urlSearchParams = this.getURLSearchParams(pageableParams, filterParams);
        return this.http.get(url, {headers: this.buildHeaders(), observe: 'response', params: urlSearchParams});
      case 'POST':
        this.log.debug('Calling api [POST]', {url: url, data: data});
        return this.http.post(url, data, {headers: this.buildHeaders()})
          .pipe(map((response) => {
            return <HttpResponse<any>>response;
          }));
    }
    return null;
  }

  private getURLSearchParams(pageableParams: PageableParams, filterParams: any): HttpParams {
    const httpParams: HttpParams = new HttpParams();
    this.setPageableParams(httpParams, pageableParams);
    this.setFilterParams(httpParams, filterParams);
    return httpParams;
  }

  private buildHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.authService.accessTokenString);
    console.log(token);
    if (token == null) {
      this.log.debug('No auth token found');
      return new HttpHeaders();
    }
    this.log.debug('Sending auth token', {token: token});

    let headers: HttpHeaders = new HttpHeaders();
    this.log.debug('headers', {headers: headers});
    headers = headers.append('Authorization', 'Bearer ' + token);
    this.log.debug('headers', {headers: headers});
    headers = headers.append('Accept-Language', 'pl');
    this.log.debug('headers', {headers: headers});
    return headers;
  }

  private notAuthorizedError(initialError: any): boolean {
    return initialError && initialError.status === 401;
  }

  private saveTokensInStorage(tokenInfo: TokenInfo) {
    localStorage.setItem(this.authService.refreshTokenString, tokenInfo.refresh_token);
    localStorage.setItem(this.authService.accessTokenString, tokenInfo.access_token);
  }

}
