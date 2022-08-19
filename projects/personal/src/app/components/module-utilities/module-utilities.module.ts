import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleSidenavComponent } from './module-sidenav/module-sidenav.component';
import { ModuleTopnavComponent } from './module-topnav/module-topnav.component';
import { ConnectionToastComponent } from './connection-toast/connection-toast.component';
import { AccessToastComponent } from './access-toast/access-toast.component';
import { DeleteModalOneComponent } from './delete-modal-one/delete-modal-one.component';
import { DeleteModalTwoComponent } from './delete-modal-two/delete-modal-two.component';
import { BdayInputComponent } from './bday-input/bday-input.component';
import { ImageInputComponent } from './image-input/image-input.component';



@NgModule({
  declarations: [
    ModuleSidenavComponent,
    ModuleTopnavComponent,
    ConnectionToastComponent,
    AccessToastComponent,
    DeleteModalOneComponent,
    DeleteModalTwoComponent,
    BdayInputComponent,
    ImageInputComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModuleUtilitiesModule { }
