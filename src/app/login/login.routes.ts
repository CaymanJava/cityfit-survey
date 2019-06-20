import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const LOGIN_ROUTES: Route[] = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {path: '', component: LoginComponent, pathMatch: 'full'}
    ]
  }
];

export const loginRouter = RouterModule.forChild(LOGIN_ROUTES);
