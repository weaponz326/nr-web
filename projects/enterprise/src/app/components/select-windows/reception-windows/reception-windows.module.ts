import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectVisitorComponent } from './select-visitor/select-visitor.component';



@NgModule({
  declarations: [
    SelectVisitorComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class ReceptionWindowsModule { }
