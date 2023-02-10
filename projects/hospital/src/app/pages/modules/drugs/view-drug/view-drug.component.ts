import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DrugFormComponent } from '../drug-form/drug-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { DrugsApiService } from 'projects/hospital/src/app/services/modules-api/drugs-api/drugs-api.service';
// import { DrugsPrintService } from 'projects/hospital/src/app/services/printing/drugs-print/drugs-print.service';

// import { Drug } from 'projects/hospital/src/app/models/modules/drugs/drugs.model';


@Component({
  selector: 'app-view-drug',
  templateUrl: './view-drug.component.html',
  styleUrls: ['./view-drug.component.scss']
})
export class ViewDrugComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private drugsApi: DrugsApiService,
    // private drugsPrint: DrugsPrintService,
  ) { }

  @ViewChild('drugFormComponentReference', { read: DrugFormComponent, static: false }) drugForm!: DrugFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Drugs", url: "/home/drugs/all-drugs" },
    { text: "View Drug", url: "/home/drugs/view-drug" },
  ];

  drugData: any;

  isDrugLoading = false;
  isDrugSaving = false;
  isDrugDeleting = false;

  ngOnInit(): void {
    this.getDrug();
  }

  getDrug(){
    this.isDrugLoading = true;

    // this.drugsApi.getDrug()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.drugData = res;
    //       this.isDrugLoading = false;

    //       this.drugForm.drugForm.controls.ndcNumber.setValue(this.drugData.ndc_number);
    //       this.drugForm.drugForm.controls.drugName.setValue(this.drugData.drug_name);
    //       this.drugForm.drugForm.controls.genericName.setValue(this.drugData.generic_name);
    //       this.drugForm.drugForm.controls.manufacturer.setValue(this.drugData.manufacturer);
    //       this.drugForm.drugForm.controls.drugType.setValue(this.drugData.drug_type);
    //       this.drugForm.drugForm.controls.unitDose.setValue(this.drugData.unit_dose);
    //       this.drugForm.drugForm.controls.drugCategory.setValue(this.drugData.drug_category);
    //       this.drugForm.drugForm.controls.unitPrice.setValue(this.drugData.unit_price);
    //       this.drugForm.drugForm.controls.batchNumber.setValue(this.drugData.batch_number);
    //       this.drugForm.drugForm.controls.purchasedDate.setValue(this.drugData.purchased_date);
    //       this.drugForm.drugForm.controls.initialQuantity.setValue(this.drugData.initial_quantity);
    //       this.drugForm.drugForm.controls.dispensedQuantity.setValue(this.drugData.dispensed_quantity);
    //       this.drugForm.drugForm.controls.remainingQuantity.setValue(this.drugData.city);
    //       this.drugForm.drugForm.controls.manufacturingDate.setValue(this.drugData.remaining_quantity);
    //       this.drugForm.drugForm.controls.expiryDate.setValue(this.drugData.expiry_date);
    //       this.drugForm.drugForm.controls.storageLocation.setValue(this.drugData.storage_location);
    //       this.drugForm.drugForm.controls.storageBin.setValue(this.drugData.storage_bin);
    //       this.drugForm.drugForm.controls.refillOrdered.setValue(this.drugData.refill_ordered);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isDrugLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putDrug(){
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

    // this.drugsApi.putDrug(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(this.drugForm.photo.isImageChanged){
    //         this.putDrugImage();
    //       }
    //       else{
    //         this.isDrugSaving = false;
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isDrugSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteDrug(){
    this.isDrugDeleting = true;

    // this.drugsApi.deleteDrug()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isDrugDeleting = false;
    //       this.router.navigateByUrl('/home/drugs/all-drug');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //       this.isDrugDeleting = false;
    //     }
    //   })
  }

  putDrugImage(){
    // this.drugsApi.putDrugPhoto(this.drugForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isDrugSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.drugsPrint.printViewDrug();
  }

}
