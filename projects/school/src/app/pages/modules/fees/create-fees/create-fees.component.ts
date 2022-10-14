import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
// import { FeesApiService } from 'projects/school/src/app/services/modules/fees-api/fees-api.service';

// import { Fees } from 'projects/school/src/app/models/modules/fees/fees.model';


@Component({
  selector: 'app-create-fees',
  templateUrl: './create-fees.component.html',
  styleUrls: ['./create-fees.component.scss']
})
export class CreateFeesComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private feesApi: FeesApiService
  ) { }

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  selectedTermId = "";
  selectedTermData = {};

  isFeesSaving = false;

  feesForm = new FormGroup({
    feesCode: new FormControl(''),
    feesDate: new FormControl(''),
    feesName: new FormControl(''),
    feesDescription: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
    this.feesForm.controls.feesDate.setValue(new Date().toISOString().slice(0, 10))
  }

  createFees(){
    // let data: Fees = {
    //   account: this.customCookie.getCookie('restaurant_id') as string,
    //   fees_code: this.feesForm.controls.feesCode.value,
    //   fees_name: this.feesForm.controls.feesName.value,
    //   fees_date: this.feesForm.controls.feesDate.value,
    //   fees_description: this.feesForm.controls.feesDescription.value,
    //   term: this.selectedTermId,
    // }

    this.isFeesSaving = true;

    // this.feesApi.createFees(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       sessionStorage.setItem('school_fees_id', res.id);

    //       this.router.navigateByUrl('/home/fees/view-fees');
    //       this.dismissButton.nativeElement.click();
    //       this.isFeesSaving = true;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFeesSaving = true;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.feesForm.controls.term.setValue(termData.data().term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

}
