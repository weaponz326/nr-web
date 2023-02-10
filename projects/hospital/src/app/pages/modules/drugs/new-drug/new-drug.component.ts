import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DrugFormComponent } from '../drug-form/drug-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { DrugsApiService } from 'projects/hospital/src/app/services/modules-api/drugs-api/drugs-api.service';

// import { Drug } from 'projects/hospital/src/app/models/modules/drugs/drugs.model';


@Component({
  selector: 'app-new-drug',
  templateUrl: './new-drug.component.html',
  styleUrls: ['./new-drug.component.scss']
})
export class NewDrugComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private drugsApi: DrugsApiService,
  ) { }

  @ViewChild('drugFormComponentReference', { read: DrugFormComponent, static: false }) drugForm!: DrugFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Drug", url: "/home/drugs/new-drug" },
  ];

  storageBasePath = "/hospital/" + this.customCookie.getCookie('hospital_id') + "/module_drugs/";

  isDrugSaving = false;

  ngOnInit(): void {
    this.getNewDrugCodeConfig();
  }

  postDrug(){
    console.log('u are saving a new drug');

    var data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      ndc_number: this.drugForm.drugForm.controls.ndcNumber.value as string,
      drug_name: this.drugForm.drugForm.controls.drugName.value as string,
      generic_name: this.drugForm.drugForm.controls.genericName.value as string,
      manufacturer: this.drugForm.drugForm.controls.manufacturer.value as string,
      drug_type: this.drugForm.drugForm.controls.drugType.value as string,
      unit_dose: this.drugForm.drugForm.controls.unitDose.value as string,
      category: this.drugForm.drugForm.controls.drugCategory.value as string,
      unit_price: this.drugForm.drugForm.controls.unitPrice.value as string,
      batch_number: this.drugForm.drugForm.controls.batchNumber.value as string,
      purchased_date: this.drugForm.drugForm.controls.purchasedDate.value as string,
      initial_quantity: this.drugForm.drugForm.controls.initialQuantity.value as string,
      dispensed_quantity: this.drugForm.drugForm.controls.dispensedQuantity.value as string,
      remaining_quantity: this.drugForm.drugForm.controls.remainingQuantity.value as string,
      manufacturing_date: this.drugForm.drugForm.controls.manufacturingDate.value as string,
      expiry_date: this.drugForm.drugForm.controls.expiryDate.value as string,
      storage_location: this.drugForm.drugForm.controls.storageLocation.value as string,
      storage_bin: this.drugForm.drugForm.controls.storageBin.value as string,
      refill_ordered: this.drugForm.drugForm.controls.refillOrdered.value as string,
    }

    console.log(data);
    this.isDrugSaving = true;

    // this.drugsApi.postDrug(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       sessionStorage.setItem('hospital_drug_id', res.id);

    //       if(this.drugForm.photo.isImageChanged){
    //         this.putDrugImage();
    //       }
    //       else{
    //         this.router.navigateByUrl('/home/drugs/view-drug');                    
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isDrugSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putDrugImage(){
    // this.drugsApi.putDrugPhoto(this.drugForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/drugs/view-drug');                    
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getNewDrugCodeConfig(){
    // this.drugsApi.getNewDrugCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.drugForm.drugForm.controls.clinicalNumber.disable();

    //       if(res.code)
    //         this.drugForm.drugForm.controls.clinicalNumber.setValue(res.code);
    //       else
    //         this.drugForm.drugForm.controls.clinicalNumber.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
