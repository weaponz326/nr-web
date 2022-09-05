import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectMenuGroupComponent } from './select-menu-group/select-menu-group.component';
import { SelectMenuItemComponent } from './select-menu-item/select-menu-item.component';



@NgModule({
  declarations: [
    SelectMenuGroupComponent,
    SelectMenuItemComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectMenuGroupComponent,
    SelectMenuItemComponent
  ]
})
export class MenuWindowsModule { }
