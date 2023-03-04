import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { PurchasingApiService } from 'projects/shop/src/app/services/modules-api/purchasing-api/purchasing-api.service';

// import { Purchasing } from 'projects/shop/src/app/models/modules/purchasing/purchasing.model';


@Component({
  selector: 'app-new-purchasing',
  templateUrl: './new-purchasing.component.html',
  styleUrls: ['./new-purchasing.component.scss']
})
export class NewPurchasingComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private purchasingApi: PurchasingApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  selectedSupplierId = "";
  selectedSupplierName = "";
  selectedTableId = "";

  isPurchasingSaving = false;

  purchasingForm = new FormGroup({
    purchasingCode: new FormControl(''),
    purchasingDate: new FormControl(),
    supplierCode: new FormControl(''),
    supplierName: new FormControl(''),
    supplierContact: new FormControl(''),
    invoiceNumber: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.purchasingForm.controls.purchasingDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewPurchasingCodeConfig();
  }

  createPurchasing(){
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
    this.isPurchasingSaving = true;

    this.purchasingApi.postPurchasing(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('shop_purchasing_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isPurchasingSaving = false;
            this.router.navigateByUrl('/home/purchasing/view-purchasing');
          }
        },
        error: (err) => {
          console.log(err);
          this.isPurchasingSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewPurchasingCodeConfig(){
    this.purchasingForm.controls.purchasingCode.disable();

    // this.purchasingApi.getNewPurchasingCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.purchasingForm.controls.purchasingNumber.setValue(res.code);
    //       else
    //         this.purchasingForm.controls.purchasingNumber.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
