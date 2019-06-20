import { NgModule } from '@angular/core';
import { LoggedinGuard } from './login';

@NgModule({
  imports: [],
  providers: [
    LoggedinGuard
  ]
})
export class CoreModule {
}
