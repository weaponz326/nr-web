import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProcurementFormComponent } from '../procurement-form/procurement-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-procurement',
  templateUrl: './view-procurement.component.html',
  styleUrls: ['./view-procurement.component.scss']
})
export class ViewProcurementComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('procurementFormComponentReference', { read: ProcurementFormComponent, static: false }) procurementForm!: ProcurementFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Procurement", url: "/home/procurement/all-procurement" },
    { text: "View Procurement", url: "/home/procurement/view-procurement" },
  ];

  procurementData: any;

  isProcurementLoading = false;
  isProcurementaving = false;
  isProcurementDeleting = false;

  isActiveProcurementaving = false;

  ngOnInit(): void {
    this.getProcurement();
  }

  getProcurement(){
    this.isProcurementLoading = true;

    
  }

  updateProcurement(){
    console.log('u are saving a new procurement');

    var data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      procurement_code: this.procurementForm.procurementForm.controls.procurementCode.value as string,
      project: this.procurementForm.procurementForm.controls.project.value as string,
      description: this.procurementForm.procurementForm.controls.description.value,
      procurement_status: this.procurementForm.procurementForm.controls.procurementStatus.value,
      order_date: this.procurementForm.procurementForm.controls.orderDate.value as string,
      order_type: this.procurementForm.procurementForm.controls.orderType.value as string,
      vendor: this.procurementForm.procurementForm.controls.vendor.value as string,
      vendor_phone: this.procurementForm.procurementForm.controls.vendor.value as string,
      vendor_email: this.procurementForm.procurementForm.controls.vendor.value as string,
      vendor_address: this.procurementForm.procurementForm.controls.vendor.value as string,
    }

    console.log(data);
    this.isProcurementaving = true;

    
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteProcurement(){
    this.isProcurementDeleting = true;

    
  }

  putActiveProcurement(){
    this.isActiveProcurementaving = true;

    let data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      procurement: sessionStorage.getItem('enterprise_procurement_id') as string,
    };

    console.log(data);

    
  }

  onPrint(){
    console.log("lets start printing...");
    // this.procurementPrint.printViewProcurement();
  }

}
