import { Route, RouterModule } from '@angular/router';
import { ConfigComponent } from './config.component';

const CONFIG_ROUTES: Route[] = [
  {
    path: '',
    component: ConfigComponent,
    children: [
      {path: '', component: ConfigComponent, pathMatch: 'full'}
    ]
  }
];

export const configRouter = RouterModule.forChild(CONFIG_ROUTES);
