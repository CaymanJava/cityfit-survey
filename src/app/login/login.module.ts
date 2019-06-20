import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginRouter } from './login.routes';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    loginRouter,
    NgbModalModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
})
export class LoginModule {
}
