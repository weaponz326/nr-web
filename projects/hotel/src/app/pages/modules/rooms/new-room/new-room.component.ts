import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RoomFormComponent } from '../room-form/room-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { RoomsApiService } from 'projects/hotel/src/app/services/modules-api/rooms-api/rooms-api.service';

// import { Room } from 'projects/hotel/src/app/models/modules/rooms/rooms.model';


@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private roomsApi: RoomsApiService
  ) { }

  @ViewChild('roomFormComponentReference', { read: RoomFormComponent, static: false }) roomForm!: RoomFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Room", url: "/home/rooms/new-room" },
  ];

  isRoomSaving = false;

  ngOnInit(): void {
  }

  createRoom(){
    console.log('u are saving a new room');

    // let data: Room = {
    let data = {
      account: this.customCookie.getCookie('hotel_id') as string,
      room_number: this.roomForm.roomForm.controls.roomNumber.value as string,
      room_type: this.roomForm.roomForm.controls.roomType.value as string,
      location: this.roomForm.roomForm.controls.location.value as string,
      rate: this.roomForm.roomForm.controls.rate.value as string,
      features: this.roomForm.roomForm.controls.features.value as string,
      room_status: this.roomForm.roomForm.controls.roomStatus.value as string,
    }

    console.log(data);
    this.isRoomSaving = true;

    // this.roomsApi.postRoom(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isRoomSaving = false;

    //       sessionStorage.setItem('hotel_room_id', res.id);
    //       this.router.navigateByUrl('/home/rooms/view-room');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isRoomSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
