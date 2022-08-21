import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ModuleSidenavComponent } from './module-sidenav/module-sidenav.component';
import { ModuleTopnavComponent } from './module-topnav/module-topnav.component';
import { ConnectionToastComponent } from './connection-toast/connection-toast.component';
import { AccessToastComponent } from './access-toast/access-toast.component';
import { BdayInputComponent } from './bday-input/bday-input.component';
import { ImageInputComponent } from './image-input/image-input.component';
import { DeleteModalOneComponent } from './delete-modal-one/delete-modal-one.component';
import { DeleteModalTwoComponent } from './delete-modal-two/delete-modal-two.component';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';
import { TableSortingComponent } from './table-sorting/table-sorting.component';
import { TableLoadingComponent } from './table-loading/table-loading.component';



@NgModule({
  declarations: [
    ModuleSidenavComponent,
    ModuleTopnavComponent,
    ConnectionToastComponent,
    AccessToastComponent,
    BdayInputComponent,
    ImageInputComponent,
    DeleteModalOneComponent,
    DeleteModalTwoComponent,
    TablePaginatorComponent,
    TableSortingComponent,
    TableLoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ModuleUtilitiesModule { }
