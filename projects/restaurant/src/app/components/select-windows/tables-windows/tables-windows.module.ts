import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectTableComponent } from './select-table/select-table.component';



@NgModule({
  declarations: [
    SelectTableComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectTableComponent    
  ]
})
export class TablesWindowsModule { }
