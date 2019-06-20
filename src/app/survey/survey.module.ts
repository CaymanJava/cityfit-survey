import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { configRouter } from './survey.routes';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { SurveyComponent } from './survey.component';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';
import { SurveyAnswerComponent } from './survey-question/surwey-answer/survey-answer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    configRouter,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    SurveyComponent,
    SurveyQuestionComponent,
    SurveyAnswerComponent
  ],
})
export class SurveyModule {
}
