import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsPage } from './rooms.page';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { ViewRoomComponent } from './view-room/view-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: RoomsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-rooms", component: AllRoomsComponent },
      { path: "new-room", component: NewRoomComponent },
      { path: "view-room", component: ViewRoomComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
