import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsPage } from './rooms.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { ViewRoomComponent } from './view-room/view-room.component';
import { RoomFormComponent } from './room-form/room-form.component';


@NgModule({
  declarations: [
    RoomsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllRoomsComponent,
    NewRoomComponent,
    ViewRoomComponent,
    RoomFormComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule
  ]
})
export class RoomsModule { }
