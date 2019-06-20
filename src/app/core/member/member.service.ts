import { Injectable } from '@angular/core';
import { MemberRegisterRequest } from './member.model';
import { Observable } from 'rxjs';
import { LoggerService } from '@ngx-toolkit/logger';
import { ApiService } from '../api';
import { Config } from '../../shared/config/env.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private api: ApiService,
              private log: LoggerService) {
  }

  registerMember(request: MemberRegisterRequest): Observable<number> {
    this.log.debug('Registering member', {request: request});
    return this.api.post(`${Config.API_URL}/members/registrations/lead`, request)
      .pipe(map((response) => {
        this.log.debug('Registered member', {response: response});
        return <number>response;
      }));
  }

}
