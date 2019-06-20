import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/login';
import { SurveySharedService } from '../core/survey/survey-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private loginService: LoginService,
              private surveySharedService: SurveySharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.surveySharedService.clear();
  }

  onCampaignSelected(event) {
    this.surveySharedService.campaignIds = event;
    console.log('this.surveyId ', this.surveySharedService.campaignIds);
  }

  onSurveySelected(event) {
    console.log(event);
    if (event.length === 0) {
      this.surveySharedService.surveyId = null;
    } else {
      this.surveySharedService.surveyId = event[0];
    }
    console.log('this.surveyId ', this.surveySharedService.surveyId);
  }

  onClubSelected(event) {
    if (event.length === 0) {
      this.surveySharedService.clubId = null;
    } else {
      this.surveySharedService.clubId = event[0];
    }
    console.log('this.clubId ', this.surveySharedService.clubId);
  }

  logout() {
    this.loginService.logout();
  }

  onSubmit() {
    this.router.navigate(['/survey']);
  }

  isDisabled() {
    return !this.surveySharedService.isDataCompleted();
  }

}
