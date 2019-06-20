import { Route, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.component';

const SURVEY_ROUTES: Route[] = [
  {
    path: '',
    component: SurveyComponent,
    children: [
      {path: '', component: SurveyComponent, pathMatch: 'full'}
    ]
  }
];

export const configRouter = RouterModule.forChild(SURVEY_ROUTES);
