import { Component, OnInit, ViewChild } from '@angular/core';

import { AddBookedRoomComponent } from '../add-booked-room/add-booked-room.component'
import { EditBookedRoomComponent } from '../edit-booked-room/edit-booked-room.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

// import { BookingsApiService } from 'projects/hotel/src/app/services/modules-api/bookings-api/bookings-api.service';


@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrls: ['./booked-rooms.component.scss']
})
export class BookedRoomsComponent implements OnInit {

  constructor(
    // private bookingsApi: BookingsApiService
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
    this.getBookedRoom();
  }

  getBookedRoom(){
    this.isFetchingGridData = true;

    // this.bookingsApi.getBookedRoom()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.itemsGridData = res;
    //       this.calculateTotalPrice();

    //       this.isFetchingGridData = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  calculateTotalPrice(){
    this.totalAmount = 0;
    for (let item of this.itemsGridData){
      this.totalAmount += item.room.rate;
    }

    this.patchTotalAmount();
    console.log(this.totalAmount);
  }

  postItem(data: any){
    console.log(data);
    this.addBookedRoom.isItemSaving = true;

    // this.bookingsApi.postItem(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getBookedRoom();

    //         this.addBookedRoom.isItemSaving = false;
    //         this.addBookedRoom.dismissButton.nativeElement.click();
    //         this.addBookedRoom.resetForm();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.addBookedRoom.isItemSaving = false;
    //       this.addBookedRoom.dismissButton.nativeElement.click();
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putItem(booking_item: any){
    console.log(booking_item);
    this.editBookedRoom.isItemSaving = true;

    // this.bookingsApi.putItem(booking_item.id, booking_item.data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.editBookedRoom.isItemSaving = false;
    //       this.editBookedRoom.dismissButton.nativeElement.click();
    //       this.getBookedRoom();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.editBookedRoom.isItemSaving = false;
    //       this.editBookedRoom.dismissButton.nativeElement.click();
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteItem(){
    this.isItemDeleting = true;

    // this.bookingsApi.deleteItem(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isItemDeleting = false;
    //       this.getBookedRoom();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isItemDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  patchTotalAmount(){
    let data = { booking_total: this.totalAmount }

    // this.bookingsApi.putBooking(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
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
