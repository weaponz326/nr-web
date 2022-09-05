import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectTableComponent } from './select-table/select-table.component';



@NgModule({
  declarations: [
    SelectTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectTableComponent    
  ]
})
export class TablesWindowsModule { }
