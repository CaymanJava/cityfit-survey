import { Component, OnInit } from '@angular/core';
import { SurveySharedService } from '../core/survey/survey-shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberRegisterRequest } from '../core/member/member.model';
import { MemberService } from '../core/member/member.service';
import * as _ from 'lodash';
import { PhoneValidator } from '../shared/validator/phone.validator';
import { Survey, SurveyService } from '../core/survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  memberForm: FormGroup;
  survey: Survey;

  constructor(private surveySharedService: SurveySharedService,
              private memberService: MemberService,
              private surveyService: SurveyService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.surveySharedService.isDataCompleted()) {
      this.router.navigate(['/config']);
    }
    console.log(this.surveySharedService.surveyId);
    console.log(this.surveySharedService.campaignIds);
    console.log(this.surveySharedService.clubId);

    this.memberForm = this.fb.group({
      'name': ['Lead member name', [Validators.required]],
      'surname': ['Lead member surname', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'mobilePhone': ['', [Validators.required, Validators.minLength(7)]],
      'lang': ['pl', [Validators.required]],
      'personalDataProcessingAgreement': ['', [Validators.required]],
      'gymRulesAgreement': ['', [Validators.required]],
      'regulationAgreement': ['', [Validators.required]],
      'marketingAgreement': ['', [Validators.required]],
      'tradeAgreement': [true, [Validators.required]],
      'underage': [false, [Validators.required]],
      'originClubId': [this.surveySharedService.clubId, [Validators.required]],
      'campaignIds': [this.surveySharedService.campaignIds, [Validators.required]],
    });

    this.surveyService.getSurveyById(this.surveySharedService.surveyId).subscribe(survey => {
      this.survey = survey;
      console.log(this.survey);
    });

  }

  onSubmit() {
    const memberRegisterRequest = <MemberRegisterRequest>_.assign({}, this.memberForm.value);
    if (!memberRegisterRequest.mobilePhone.startsWith('+')) {
      memberRegisterRequest.mobilePhone = '+48' + memberRegisterRequest.mobilePhone;
    }
    this.memberService.registerMember(memberRegisterRequest).subscribe(response => {
      console.log('registerMember ', response);
    });
  }

  get form() {
    return this.memberForm.controls;
  }

}
