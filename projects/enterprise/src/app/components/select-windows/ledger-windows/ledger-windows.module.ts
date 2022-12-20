import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectLedgerComponent } from './select-ledger/select-ledger.component';



@NgModule({
  declarations: [
    SelectLedgerComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class LedgerWindowsModule { }
