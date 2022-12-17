import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProcurementFormComponent } from '../procurement-form/procurement-form.component';
import { OrderReviewComponent } from '../order-review/order-review.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ProcurementApiService } from 'projects/enterprise/src/app/services/modules-api/procurement-api/procurement-api.service';

import { Procurement } from 'projects/enterprise/src/app/models/modules/procurement/procurement.model';


@Component({
  selector: 'app-view-procurement',
  templateUrl: './view-procurement.component.html',
  styleUrls: ['./view-procurement.component.scss']
})
export class ViewProcurementComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private procurementApi: ProcurementApiService
  ) { }

  @ViewChild('procurementFormComponentReference', { read: ProcurementFormComponent, static: false }) procurementForm!: ProcurementFormComponent;
  @ViewChild('orderReviewComponentReference', { read: OrderReviewComponent, static: false }) orderReview!: OrderReviewComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Procurement", url: "/home/procurement/all-procurement" },
    { text: "View Procurement", url: "/home/procurement/view-procurement" },
  ];

  procurementData: any;

  isProcurementLoading = false;
  isProcurementSaving = false;
  isProcurementDeleting = false;

  ngOnInit(): void {
    this.getProcurement();
  }

  getProcurement(){
    this.isProcurementLoading = true;

    this.procurementApi.getProcurement()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.procurementData = res;
          this.isProcurementLoading = false;

          this.procurementForm.procurementForm.controls.procurementCode.setValue(this.procurementData.procurement_code);
          this.procurementForm.procurementForm.controls.project.setValue(this.procurementData.project);
          this.procurementForm.procurementForm.controls.description.setValue(this.procurementData.description);
          this.procurementForm.procurementForm.controls.procurementStatus.setValue(this.procurementData.procurement_status);
          this.procurementForm.procurementForm.controls.orderCode.setValue(this.procurementData.order_code);
          this.procurementForm.procurementForm.controls.orderDate.setValue(this.procurementData.order_date);
          this.procurementForm.procurementForm.controls.orderType.setValue(this.procurementData.order_type);
          this.procurementForm.procurementForm.controls.vendor.setValue(this.procurementData.vendor);
          this.procurementForm.procurementForm.controls.vendorPhone.setValue(this.procurementData.vendor_phone);
          this.procurementForm.procurementForm.controls.vendorEmail.setValue(this.procurementData.vendor_email);
          this.procurementForm.procurementForm.controls.vendorAddress.setValue(this.procurementData.vendor_address);

        },
        error: (err) => {
          console.log(err);
          this.isProcurementLoading = false;
          this.connectionToast.openToast();
        }
      })    
  }

  updateProcurement(){
    console.log('u are saving a new procurement');

    var data: Procurement = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      procurement_code: this.procurementForm.procurementForm.controls.procurementCode.value as string,
      project: this.procurementForm.procurementForm.controls.project.value as string,
      description: this.procurementForm.procurementForm.controls.description.value as string,
      procurement_status: this.procurementForm.procurementForm.controls.procurementStatus.value as string,
      order_code: this.procurementForm.procurementForm.controls.orderCode.value as string,
      order_date: this.procurementForm.procurementForm.controls.orderDate.value,
      order_type: this.procurementForm.procurementForm.controls.orderType.value as string,
      vendor: this.procurementForm.procurementForm.controls.vendor.value as string,
      vendor_phone: this.procurementForm.procurementForm.controls.vendorPhone.value as string,
      vendor_email: this.procurementForm.procurementForm.controls.vendorEmail.value as string,
      vendor_address: this.procurementForm.procurementForm.controls.vendorAddress.value as string,
    }

    console.log(data);
    this.isProcurementSaving = true;

    this.procurementApi.putProcurement(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isProcurementSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isProcurementSaving = false;
          this.connectionToast.openToast();
        }
      })

    this.orderReview.updateOrderReview();
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteProcurement(){
    this.isProcurementDeleting = true;

    this.procurementApi.deleteProcurement()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/procurement/all-procurement');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      }) 

    this.orderReview.deleteOrderReview();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.procurementPrint.printViewProcurement();
  }

}
