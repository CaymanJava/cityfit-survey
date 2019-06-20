import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { ApiService } from '../api';
import { PageSlice } from '../api';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { LoggerService } from '@ngx-toolkit/logger';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(public api: ApiService,
              private log: LoggerService) {
  }

  getClubs(): Observable<PageSlice> {
    this.log.debug('Getting clubs');
    return this.api.get(`${Config.API_URL}/clubs`, {page: 0}, {isDeleted: false})
      .pipe(map((response: HttpResponse<any>) => {
        this.log.debug('Got clubs', {response: response});
        return <PageSlice>response.body;
      }));
  }

}
