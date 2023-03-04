import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectServiceComponent } from './select-service/select-service.component';



@NgModule({
  declarations: [
    SelectServiceComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectServiceComponent
  ]
})
export class ServicesWindowsModule { }
