import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { configRouter } from './config.routes';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigComponent } from './config.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    configRouter,
    NgbModalModule,
    SharedModule
  ],
  declarations: [ConfigComponent],
})
export class ConfigModule {
}
