import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectCheckinComponent } from '../../../../components/select-windows/checkin-windows/select-checkin/select-checkin.component';
// import { SelectServiceComponent } from '../../../../components/select-windows/services-windows/select-service/select-service.component';

import { BillsApiService } from 'projects/hotel/src/app/services/modules-api/bills-api/bills-api.service';
import { CheckinCharge, ServiceCharge } from 'projects/hotel/src/app/models/modules/bills/bills.model';


@Component({
  selector: 'app-bill-tables',
  templateUrl: './bill-tables.component.html',
  styleUrls: ['./bill-tables.component.scss']
})
export class BillTablesComponent implements OnInit {

  constructor(
    private router: Router,
    private billsApi: BillsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  // @ViewChild('selectCheckinComponentReference', { read: SelectCheckinComponent, static: false }) selectCheckin!: SelectCheckinComponent;
  // @ViewChild('selectServiceComponentReference', { read: SelectServiceComponent, static: false }) selectService!: SelectServiceComponent;

  checkinGridData: any[] = [];
  servicesGridData: any[] = [];

  checkinDeleteId = "";
  serviceDeleteId = "";

  isFetchingCheckinGridData = false;
  isCheckinDeleting = false;
  isFetchingServiceGridData = false;
  isServiceDeleting = false;

  totalCheckinAmount = 0;
  totalServicesAmount = 0;

    lastCheckinItem = 0;
    lastServiceItem = 0;

  ngOnInit(): void {
    this.getBillCheckinCharge();
    this.getBillServiceCharge();
  }

  getBillCheckinCharge(){
    this.isFetchingCheckinGridData = true;

    this.billsApi.getBillCheckinCharge()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingCheckinGridData = false;
          this.checkinGridData = res;

          try { this.lastCheckinItem = Number((res[res.length - 1]).item_number) }
          catch{ this.lastCheckinItem = 0 }

        },
        error: (err) => {
          console.log(err);
          this.isFetchingCheckinGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  getBillServiceCharge(){
    this.isFetchingServiceGridData = true;

    this.billsApi.getBillServiceCharge()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingServiceGridData = false;
          this.checkinGridData = res;

          try { this.lastServiceItem = Number((res[res.length - 1]).item_number) }
          catch{ this.lastServiceItem = 0 }

        },
        error: (err) => {
          console.log(err);
          this.isFetchingServiceGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postCheckinCharge(checkinData: any){
    let data: CheckinCharge = {
      bill: sessionStorage.getItem('hotel_bill_id') as string,
      checkin: checkinData.id,
      item_number: this.lastCheckinItem + 1
    }

    this.billsApi.postCheckinCharge(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getBillCheckinCharge();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  postServiceCharge(serviceData: any){
    let data: ServiceCharge = {
      bill: sessionStorage.getItem('hotel_bill_id') as string,
      service: serviceData.id,
      item_number: this.lastServiceItem + 1
    }

    this.billsApi.postServiceCharge(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getBillServiceCharge();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteCheckinCharge(){
    this.isCheckinDeleting = true;

    this.billsApi.deleteCheckinCharge(this.checkinDeleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCheckinDeleting = false;
          this.getBillCheckinCharge();
        },
        error: (err) => {
          console.log(err);
          this.isCheckinDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteServiceCharge(){
    this.isCheckinDeleting = true;

    this.billsApi.deleteServiceCharge(this.serviceDeleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isServiceDeleting = false;
          this.getBillServiceCharge();
        },
        error: (err) => {
          console.log(err);
          this.isServiceDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmCheckinDelete(id: any){
    this.checkinDeleteId = id;
    this.deleteModal.openModal();
  }

  confirmServiceDelete(id: any){
    this.serviceDeleteId = id;
    this.deleteModal.openModal();
  }

  gotoCheckin(id: any){

  }

  gotoService(id: any){

  }

}
