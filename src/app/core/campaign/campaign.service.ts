import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { ApiService } from '../api/api.service';
import { PageSlice } from '../api/api.model';
import { LoggerService } from '@ngx-toolkit/logger';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export * from './campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(public api: ApiService, private log: LoggerService) {
  }

  getCampaigns(): Observable<PageSlice> {
    this.log.debug('Getting campaigns');
    return this.api.get(`${Config.API_URL}/campaigns`, {page: 0}, {})
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got campaigns', {response: response});
          return <PageSlice>response.body;
        }));
  }

}
