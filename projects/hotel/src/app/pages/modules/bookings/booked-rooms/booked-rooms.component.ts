import { Component, OnInit, ViewChild } from '@angular/core';

import { AddBookedRoomComponent } from '../add-booked-room/add-booked-room.component'
import { EditBookedRoomComponent } from '../edit-booked-room/edit-booked-room.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { BookingsApiService } from 'projects/hotel/src/app/services/modules-api/bookings-api/bookings-api.service';


@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrls: ['./booked-rooms.component.scss']
})
export class BookedRoomsComponent implements OnInit {

  constructor(
    private bookingsApi: BookingsApiService
  ) { }

  @ViewChild('addBookedRoomComponentReference', { read: AddBookedRoomComponent, static: false }) addBookedRoom!: AddBookedRoomComponent;
  @ViewChild('editBookedRoomComponentReference', { read: EditBookedRoomComponent, static: false }) editBookedRoom!: EditBookedRoomComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  itemsGridData: any[] = [];

  totalAmount = 0;

  deleteId = "";
  isItemDeleting = false;

  isFetchingGridData = false;

  ngOnInit(): void {
    this.getBookingBookedRoom();
  }

  getBookingBookedRoom(){
    this.isFetchingGridData = true;

    this.bookingsApi.getBookingBookedRoom()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.itemsGridData = res;
          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postBookedRoom(data: any){
    console.log(data);
    this.addBookedRoom.isItemSaving = true;

    this.bookingsApi.postBookedRoom(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getBookingBookedRoom();

            this.addBookedRoom.isItemSaving = false;
            this.addBookedRoom.dismissButton.nativeElement.click();
            this.addBookedRoom.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addBookedRoom.isItemSaving = false;
          this.addBookedRoom.dismissButton.nativeElement.click();
          this.connectionToast.openToast();
        }
      })
  }

  putBookedRoom(booking_item: any){
    console.log(booking_item);
    this.editBookedRoom.isItemSaving = true;

    this.bookingsApi.putBookedRoom(booking_item.id, booking_item.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.editBookedRoom.isItemSaving = false;
          this.editBookedRoom.dismissButton.nativeElement.click();
          this.getBookingBookedRoom();
        },
        error: (err) => {
          console.log(err);
          this.editBookedRoom.isItemSaving = false;
          this.editBookedRoom.dismissButton.nativeElement.click();
          this.connectionToast.openToast();
        }
      })
  }

  deleteBookedRoom(){
    this.isItemDeleting = true;

    this.bookingsApi.deleteBookedRoom(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isItemDeleting = false;
          this.getBookingBookedRoom();
        },
        error: (err) => {
          console.log(err);
          this.isItemDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditBookedRoom(data: any){
    console.log(data);
    this.editBookedRoom.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
