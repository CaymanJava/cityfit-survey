import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CampaignSelectComponent } from './campaign-select/campaign-select.component';
import { SurveySelectComponent } from './survey-select/survey-select.component';
import { ClubSelectComponent } from './club-select/club-select.component';
import { PhoneNumberComponent } from './phone.number/phone.number.component';
import { InternationalPhoneModule } from 'ng4-intl-phone';


const components = [
  CampaignSelectComponent,
  SurveySelectComponent,
  ClubSelectComponent,
  PhoneNumberComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbTooltipModule,
    NgMultiSelectDropDownModule.forRoot(),
    InternationalPhoneModule
  ],
  declarations: [
    components
  ],
  exports: [
    components
  ]
})
export class SharedModule {
}
