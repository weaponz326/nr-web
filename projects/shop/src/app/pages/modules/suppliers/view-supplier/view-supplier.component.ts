import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { SuppliersApiService } from 'projects/shop/src/app/services/modules-api/suppliers-api/suppliers-api.service';
// import { SuppliersPrintService } from 'projects/shop/src/app/services/modules-printing/suppliers-print/suppliers-print.service';

// import { Supplier } from 'projects/shop/src/app/models/modules/suppliers/suppliers.model';


@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss']
})
export class ViewSupplierComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private suppliersApi: SuppliersApiService,
    // private suppliersPrint: SuppliersPrintService,
  ) { }

  @ViewChild('supplierFormComponentReference', { read: SupplierFormComponent, static: false }) supplierForm!: SupplierFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Suppliers", url: "/home/suppliers/all-suppliers" },
    { text: "View Supplier", url: "/home/suppliers/view-supplier" },
  ];

  supplierData: any;

  isSupplierLoading = false;
  isSupplierSaving = false;
  isSupplierDeleting = false;

  ngOnInit(): void {
    this.getSupplier();
  }

  getSupplier(){
    this.isSupplierLoading = true;

    // this.suppliersApi.getSupplier()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.supplierData = res;
    //       this.isSupplierLoading = false;

    //       this.supplierForm.supplierForm.controls.supplierCode.setValue(this.supplierData.supplier_code);
    //       this.supplierForm.supplierForm.controls.supplierName.setValue(this.supplierData.supplier_name);
    //       this.supplierForm.supplierForm.controls.supplierType.setValue(this.supplierData.supplier_type);
    //       this.supplierForm.supplierForm.controls.phone.setValue(this.supplierData.phone);
    //       this.supplierForm.supplierForm.controls.email.setValue(this.supplierData.email);
    //       this.supplierForm.supplierForm.controls.address.setValue(this.supplierData.address);
    //       this.supplierForm.supplierForm.controls.state.setValue(this.supplierData.state);
    //       this.supplierForm.supplierForm.controls.city.setValue(this.supplierData.city);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isSupplierLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putSupplier(){
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

    // this.suppliersApi.putSupplier(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isSupplierSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isSupplierSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteSupplier(){
    this.isSupplierDeleting = true;

    // this.suppliersApi.deleteSupplier()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/suppliers/all-suppliers');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.suppliersPrint.printViewSupplier();
  }

}
