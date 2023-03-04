import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { PurchasingItemsComponent } from '../purchasing-items/purchasing-items.component';
// import { SelectSupplierComponent } from '../../../../components/select-windows/suppliers-windows/select-supplier/select-supplier.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { PurchasingApiService } from 'projects/shop/src/app/services/modules-api/purchasing-api/purchasing-api.service';
// import { PurchasingPrintService } from 'projects/shop/src/app/services/modules-printing/purchasing-print/purchasing-print.service';

// import { Purchasing } from 'projects/shop/src/app/models/modules/purchasing/purchasing.model';


@Component({
  selector: 'app-view-purchasing',
  templateUrl: './view-purchasing.component.html',
  styleUrls: ['./view-purchasing.component.scss']
})
export class ViewPurchasingComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private purchasingApi: PurchasingApiService,
    // private purchasingPrint: PurchasingPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('purchasingItemsComponentReference', { read: PurchasingItemsComponent, static: false }) purchasingItems!: PurchasingItemsComponent;

  // @ViewChild('selectSupplierComponentReference', { read: SelectSupplierComponent, static: false }) selectSupplier!: SelectSupplierComponent;

  navHeading: any[] = [
    { text: "All Purchasing", url: "/home/purchasing/all-purchasing" },
    { text: "View Purchasing", url: "/home/purchasing/view-purchasing" },
  ];

  purchasingFormData: any;

  selectedSupplierId = "";
  selectedSupplierName = "";
  selectedTableId = "";

  isPurchasingLoading: boolean = false;
  isPurchasingaving: boolean = false;
  isPurchasingDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  purchasingForm = new FormGroup({
    purchasingCode: new FormControl(''),
    purchasingDate: new FormControl(),
    supplierCode: new FormControl(''),
    supplierName: new FormControl(''),
    supplierContact: new FormControl(''),
    invoiceNumber: new FormControl(''),
    status: new FormControl(''),
  })

  ngOnInit(): void {
    this.getPurchasing();
  }

  getPurchasing(){
    this.isPurchasingLoading = true;

    // this.purchasingApi.getPurchasing()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.purchasingFormData = res;
    //       this.isPurchasingLoading = false;

    //       this.purchasingForm.controls.purchasingCode.setValue(this.purchasingFormData.purchasing_code);
    //       this.purchasingForm.controls.purchasingDate.setValue(new Date(this.purchasingFormData.purchasing_date).toISOString().slice(0, 16));
    //       this.purchasingForm.controls.invoiceNumber.setValue(this.purchasingFormData.invoice_number);

    //       this.selectedSupplierId = this.purchasingFormData.supplier?.id;
    //       this.selectedSupplierName = this.purchasingFormData.supplier_name;
    //       this.selectedSupplierCode = this.purchasingFormData.supplier_code;
    //       this.purchasingForm.controls.supplierName.setValue(this.purchasingFormData.supplier_name);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isPurchasingLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putPurchasing(){
    var supplierName = "";

    if(this.selectedSupplierName != ""){
      supplierName = this.selectedSupplierName;
    }
    else{
      supplierName = this.purchasingForm.controls.supplierName.value as string;
    }

    // let data: Purchasing = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      supplier: this.selectedSupplierId,
      purchasing_code: this.purchasingForm.controls.purchasingCode.value as string,
      purchasing_date: this.purchasingForm.controls.purchasingDate.value as string,
      invoice_number: this.purchasingForm.controls.invoiceNumber.value as string,
      total_amount: 0,
      purchasing_status: "",
    }

    console.log(data);
    this.isPurchasingaving = true;

    // this.purchasingApi.putPurchasing(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isPurchasingaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isPurchasingaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deletePurchasing(){
    this.isPurchasingDeleting = true;

    // this.purchasingApi.deletePurchasing()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/purchasing/all-purchasing');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  openSupplierWindow(){
    console.log("You are opening select supplier window")
    // this.selectSupplier.openModal();
  }

  onSupplierSelected(supplierData: any){
    console.log(supplierData);

    this.purchasingForm.controls.supplierName.setValue(supplierData.supplier_name);
    this.selectedSupplierId = supplierData.id;
  }  

  onPrint(){
    console.log("lets start printing...");
    // this.purchasingPrint.printViewPurchasing();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.purchasingPrint.printPurchasingRoll();
  }
  
}
