import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMenuGroupComponent } from './select-menu-group/select-menu-group.component';
import { SelectMenuItemComponent } from './select-menu-item/select-menu-item.component';



@NgModule({
  declarations: [
    SelectMenuGroupComponent,
    SelectMenuItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectMenuGroupComponent,
    SelectMenuItemComponent
  ]
})
export class MenuWindowsModule { }
