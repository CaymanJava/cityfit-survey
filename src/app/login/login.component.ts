import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials, LoginService, TokenInfo } from '../core/login';
import { NotificationService } from '../shared/notification/notification.service';
import { LoggerService } from '@ngx-toolkit/logger';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private log: LoggerService,
    private loginService: LoginService,
    private notificationService: NotificationService) {
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/config';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginCred = <LoginCredentials>_.assign({}, this.loginForm.value);

    this.loginService.login(loginCred)
      .subscribe(tokenInfo => {
          this.loginSuccessful(tokenInfo);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.notificationService.error('Błąd logowania');
        });
  }

  private loginSuccessful(tokenInfo: TokenInfo) {
    this.log.debug('Login successful', {tokenInfo: tokenInfo});
    localStorage.setItem('access_token', tokenInfo.access_token);
    localStorage.setItem('refresh_token', tokenInfo.refresh_token);
    this.router.navigateByUrl('/config');
  }

}
