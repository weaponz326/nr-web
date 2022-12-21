import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectAccountComponent } from './select-account/select-account.component';



@NgModule({
  declarations: [
    SelectAccountComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectAccountComponent
  ]
})
export class AccountsWindowsModule { }
