import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectCheckinComponent } from '../../../../components/select-windows/checkin-windows/select-checkin/select-checkin.component';
// import { SelectServiceComponent } from '../../../../components/select-windows/services-windows/select-service/select-service.component';

// import { BillsApiService } from 'projects/hotel/src/app/services/modules-api/bills-api/bills-api.service';


@Component({
  selector: 'app-bill-tables',
  templateUrl: './bill-tables.component.html',
  styleUrls: ['./bill-tables.component.scss']
})
export class BillTablesComponent implements OnInit {

  constructor(
    private router: Router,
    // private billsApi: BillsApiService,
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

  ngOnInit(): void {
    this.getCheckinBill();
    this.getServicesBill();
  }

  getCheckinBill(){
    this.isFetchingCheckinGridData = true;

    // this.billsApi.getCheckinBill()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isFetchingCheckinGridData = false;
    //       this.checkinGridData = res;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingCheckinGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getServicesBill(){
    this.isFetchingServiceGridData = true;

    // this.billsApi.getServicesBill()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isFetchingServiceGridData = false;
    //       this.checkinGridData = res;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingServiceGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  postCheckinBill(checkinData: any){
    let data = {
      bill: sessionStorage.getItem('hotel_bill_id') as string,
      checkin: checkinData.id,
    }

    // this.billsApi.postCheckinBill(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getCheckinBill();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  postServiceBill(serviceData: any){
    let data = {
      bill: sessionStorage.getItem('hotel_bill_id') as string,
      service: serviceData.id,
    }

    // this.billsApi.postServiceBill(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getServicesBill();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteCheckinBill(){
    this.isCheckinDeleting = true;

    // this.billsApi.deleteCheckinBill(this.checkinDeleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isCheckinDeleting = false;
    //       this.getCheckinBill();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isCheckinDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteServiceBill(){
    this.isCheckinDeleting = true;

    // this.billsApi.deleteServiceBill(this.serviceDeleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isServiceDeleting = false;
    //       this.getCheckinBill();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isServiceDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
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
