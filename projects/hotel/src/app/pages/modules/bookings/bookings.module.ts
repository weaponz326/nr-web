import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookingsRoutingModule } from './bookings-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { BookingsPage } from './bookings.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { BookedRoomsComponent } from './booked-rooms/booked-rooms.component';
import { AddBookedRoomComponent } from './add-booked-room/add-booked-room.component';
import { EditBookedRoomComponent } from './edit-booked-room/edit-booked-room.component';
import { BookedRoomFormComponent } from './booked-room-form/booked-room-form.component';


@NgModule({
  declarations: [
    BookingsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllBookingsComponent,
    AddBookingComponent,
    ViewBookingComponent,
    BookedRoomsComponent,
    AddBookedRoomComponent,
    EditBookedRoomComponent,
    BookedRoomFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookingsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class BookingsModule { }
