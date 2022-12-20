import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectAssetComponent } from './select-asset/select-asset.component';



@NgModule({
  declarations: [
    SelectAssetComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class AssetsWindowsModule { }
