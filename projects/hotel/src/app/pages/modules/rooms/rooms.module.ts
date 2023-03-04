import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoomsRoutingModule } from './rooms-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    RoomsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class RoomsModule { }
