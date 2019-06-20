import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { ApiService } from '../api';
import { PageSlice } from '../api';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoggerService } from '@ngx-toolkit/logger';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';

export * from './survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(public api: ApiService,
              private log: LoggerService) {
  }

  getSurveys(): Observable<PageSlice> {
    this.log.debug('Getting surveys');
    return this.api.get(`${Config.API_URL}/surveys`, {page: 0}, {})
      .pipe(map((response: HttpResponse<any>) => {
        this.log.debug('Got surveys', {response: response});
        return <PageSlice>response.body;
      }));
  }

  getSurveyById(id: number): Observable<Survey> {
    this.log.debug('Getting survey by id', {id: id});
    return this.api.get(`${Config.API_URL}/surveys/simple/${id}`, {}, {})
      .pipe(map((response: HttpResponse<any>) => {
        this.log.debug('Got survey', {response: response});
        return <Survey>response.body;
      }));
  }

  // TODO add answers

}
