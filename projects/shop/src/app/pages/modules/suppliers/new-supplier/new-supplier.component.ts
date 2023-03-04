import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { SuppliersApiService } from 'projects/shop/src/app/services/modules-api/suppliers-api/suppliers-api.service';

// import { Supplier } from 'projects/shop/src/app/models/modules/suppliers/suppliers.model';


@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss']
})
export class NewSupplierComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private suppliersApi: SuppliersApiService
  ) { }

  @ViewChild('supplierFormComponentReference', { read: SupplierFormComponent, static: false }) supplierForm!: SupplierFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Supplier", url: "/home/suppliers/new-supplier" },
  ];

  isSupplierSaving = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getNewsupplierCodeConfig();
  }

  createSupplier(){
    console.log('u are saving a new supplier');

    // let data: Supplier = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      supplier_code: this.supplierForm.supplierForm.controls.supplierCode.value as string,
      supplier_name: this.supplierForm.supplierForm.controls.supplierName.value as string,
      supplier_type: this.supplierForm.supplierForm.controls.supplierType.value as string,
      phone: this.supplierForm.supplierForm.controls.phone.value as string,
      email: this.supplierForm.supplierForm.controls.email.value as string,
      address: this.supplierForm.supplierForm.controls.address.value as string,
      state: this.supplierForm.supplierForm.controls.state.value as string,
      city: this.supplierForm.supplierForm.controls.city.value as string,
    }

    console.log(data);
    this.isSupplierSaving = true;

    this.suppliersApi.postSupplier(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isSupplierSaving = false;

          sessionStorage.setItem('shop_supplier_id', res.id);
          this.router.navigateByUrl('/home/suppliers/view-supplier');
        },
        error: (err) => {
          console.log(err);
          this.isSupplierSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewsupplierCodeConfig(){
    this.supplierForm.supplierForm.controls.supplierCode.disable();

    // this.suppliersApi.getNewSupplierCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.supplierForm.supplierForm.controls.supplierCode.setValue(res.code);
    //       else
    //         this.supplierForm.supplierForm.controls.supplierCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
