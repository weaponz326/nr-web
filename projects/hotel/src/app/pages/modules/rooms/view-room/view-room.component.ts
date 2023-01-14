import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RoomFormComponent } from '../room-form/room-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { RoomsApiService } from 'projects/hotel/src/app/services/modules-api/rooms-api/rooms-api.service';
// import { RoomsPrintService } from 'projects/hotel/src/app/services/modules-printing/rooms-print/rooms-print.service';

// import { Room } from 'projects/hotel/src/app/models/modules/rooms/rooms.model';


@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.scss']
})
export class ViewRoomComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private roomsApi: RoomsApiService,
    // private roomsPrint: RoomsPrintService,
  ) { }

  @ViewChild('roomFormComponentReference', { read: RoomFormComponent, static: false }) roomForm!: RoomFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Rooms", url: "/home/rooms/all-rooms" },
    { text: "View Room", url: "/home/rooms/view-room" },
  ];

  roomData: any;

  isRoomLoading = false;
  isRoomSaving = false;
  isRoomDeleting = false;

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(){
    this.isRoomLoading = true;

    // this.roomsApi.getRoom()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.roomData = res;
    //       this.isRoomLoading = false;

    //       this.roomForm.roomForm.controls.roomNumber.setValue(this.roomData.room_number);
    //       this.roomForm.roomForm.controls.roomType.setValue(this.roomData.room_type);
    //       this.roomForm.roomForm.controls.location.setValue(this.roomData.location);
    //       this.roomForm.roomForm.controls.rate.setValue(this.roomData.rate);
    //       this.roomForm.roomForm.controls.features.setValue(this.roomData.features);
    //       this.roomForm.roomForm.controls.roomStatus.setValue(this.roomData.room_status);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isRoomLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putRoom(){
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

    // this.roomsApi.putRoom(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isRoomSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isRoomSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteRoom(){
    this.isRoomDeleting = true;

    // this.roomsApi.deleteRoom()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/rooms/all-rooms');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.roomsPrint.printViewRoom();
  }

}
