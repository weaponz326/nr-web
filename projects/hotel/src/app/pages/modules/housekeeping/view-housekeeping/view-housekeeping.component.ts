import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { HousekeepingChecklistComponent } from '../housekeeping-checklist/housekeeping-checklist.component';
import { SelectRoomComponent } from '../../../../components/select-windows/rooms-windows/select-room/select-room.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { HousekeepingApiService } from 'projects/hotel/src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
// import { HousekeepingPrintService } from 'projects/hotel/src/app/services/modules-printing/housekeeping-print/housekeeping-print.service';

import { Housekeeping } from 'projects/hotel/src/app/models/modules/housekeeping/housekeeping.model';


@Component({
  selector: 'app-view-housekeeping',
  templateUrl: './view-housekeeping.component.html',
  styleUrls: ['./view-housekeeping.component.scss']
})
export class ViewHousekeepingComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private housekeepingApi: HousekeepingApiService,
    // private housekeepingPrint: HousekeepingPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('housekeepingChecklistComponentReference', { read: HousekeepingChecklistComponent, static: false }) housekeepingChecklist!: HousekeepingChecklistComponent;
  @ViewChild('selectRoomComponentReference', { read: SelectRoomComponent, static: false }) selectRoom!: SelectRoomComponent;

  navHeading: any[] = [
    { text: "All Housekeeping", url: "/home/housekeeping/all-housekeeping" },
    { text: "View Housekeeping", url: "/home/housekeeping/view-housekeeping" },
  ];

  housekeepingFormData: any;

  isHousekeepingLoading: boolean = false;
  isHousekeepingaving: boolean = false;
  isHousekeepingDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  housekeepingForm = new FormGroup({
    housekeepingCode: new FormControl(''),
    housekeepingDate: new FormControl(),
    roomNumber: new FormControl({value: '', disabled: true}),
  })

  selectedRoomId = '';

  ngOnInit(): void {
    this.getHousekeeping();
    this.getHousekeepingCodeConfig();
  }

  getHousekeeping(){
    this.isHousekeepingLoading = true;

    this.housekeepingApi.getHousekeeping()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.housekeepingFormData = res;
          this.isHousekeepingLoading = false;

          this.housekeepingForm.controls.housekeepingCode.setValue(this.housekeepingFormData.housekeeping_code);
          this.housekeepingForm.controls.housekeepingDate.setValue(new Date(this.housekeepingFormData.housekeeping_date).toISOString().slice(0, 16));
          this.housekeepingForm.controls.roomNumber.setValue(this.housekeepingFormData.room?.room_number);

          this.selectedRoomId = this.housekeepingFormData.room?.id;
        },
        error: (err) => {
          console.log(err);
          this.isHousekeepingLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putHousekeeping(){
    let data: Housekeeping = {
      account: this.customCookie.getCookie('hotel_id') as string,
      room: this.selectedRoomId,
      housekeeping_code: this.housekeepingForm.controls.housekeepingCode.value as string,
      housekeeping_date: this.housekeepingForm.controls.housekeepingDate.value,
    }

    console.log(data);
    this.isHousekeepingaving = true;

    this.housekeepingApi.putHousekeeping(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isHousekeepingaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isHousekeepingaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteHousekeeping(){
    this.isHousekeepingDeleting = true;

    this.housekeepingApi.deleteHousekeeping()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/housekeeping/all-housekeeping');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openRoomWindow(){
    console.log("You are opening select room window")
    this.selectRoom.openModal();
  }

  onRoomSelected(roomData: any){
    console.log(roomData);

    this.selectedRoomId = roomData.id;
    this.housekeepingForm.controls.roomNumber.setValue(roomData.room_number);
  }

  getHousekeepingCodeConfig(){
    this.housekeepingApi.getHousekeepingCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.housekeepingForm.controls.housekeepingCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.housekeepingPrint.printViewHousekeeping();
  }

}
