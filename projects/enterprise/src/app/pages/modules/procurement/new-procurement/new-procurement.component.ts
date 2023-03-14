import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProcurementFormComponent } from '../procurement-form/procurement-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ProcurementApiService } from 'projects/enterprise/src/app/services/modules-api/procurement-api/procurement-api.service';

import { Procurement } from 'projects/enterprise/src/app/models/modules/procurement/procurement.model';


@Component({
  selector: 'app-new-procurement',
  templateUrl: './new-procurement.component.html',
  styleUrls: ['./new-procurement.component.scss']
})
export class NewProcurementComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private procurementApi: ProcurementApiService
  ) { }

  @ViewChild('procurementFormComponentReference', { read: ProcurementFormComponent, static: false }) procurementForm!: ProcurementFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Procurement", url: "/home/procurement/new-procurement" },
  ];

  isProcurementaving = false;

  ngOnInit(): void {
    this.getNewProcurementCodeConfig();
  }

  postProcurement(){
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
      vendor_phone: this.procurementForm.procurementForm.controls.vendor.value as string,
      vendor_email: this.procurementForm.procurementForm.controls.vendor.value as string,
      vendor_address: this.procurementForm.procurementForm.controls.vendor.value as string,
    }

    console.log(data);
    this.isProcurementaving = true;

    this.procurementApi.postProcurement(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isProcurementaving = false;

          sessionStorage.setItem('enterprise_procurement_id', res.id);
          this.router.navigateByUrl('/home/procurement/view-procurement');
        },
        error: (err) => {
          console.log(err);
          this.isProcurementaving = false;
          this.connectionToast.openToast();
        }
      }) 
  }

  getNewProcurementCodeConfig(){
    this.procurementApi.getNewProcurementCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.procurementForm.procurementForm.controls.procurementCode.setValue(res.code);
            this.procurementForm.procurementForm.controls.procurementCode.disable();
          }
          else{
            this.procurementForm.procurementForm.controls.procurementCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
