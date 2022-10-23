import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { FeesFormComponent } from '../fees-form/fees-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { FeesApiService } from 'projects/school/src/app/services/modules-api/fees-api/fees-api.service';

import { Fees } from 'projects/school/src/app/models/modules/fees/fees.model';


@Component({
  selector: 'app-create-fees',
  templateUrl: './create-fees.component.html',
  styleUrls: ['./create-fees.component.scss']
})
export class CreateFeesComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private feesApi: FeesApiService
  ) { }

  @ViewChild('feesFormComponentReference', { read: FeesFormComponent, static: false }) feesForm!: FeesFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "Create Fees", url: "/home/fees/create-fees" },
  ];

  isFeesSaving = false;

  ngOnInit(): void {
    this.getNewFeesCodeConfig();
  }

  ngAfterViewInit(): void {
    this.feesForm.feesForm.controls.feesDate.setValue(new Date().toISOString().slice(0, 10));
  }

  postFees(){
    let data: Fees = {
      account: this.customCookie.getCookie('school_id') as string,
      fees_code: this.feesForm.feesForm.controls.feesCode.value as string,
      fees_name: this.feesForm.feesForm.controls.feesName.value as string,
      fees_date: this.feesForm.feesForm.controls.feesDate.value,
      fees_description: this.feesForm.feesForm.controls.feesDescription.value as string,
      term: this.feesForm.selectedTermId,
    }

    this.isFeesSaving = true;

    this.feesApi.postFees(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          sessionStorage.setItem('school_fees_id', res.id);
          this.router.navigateByUrl('/home/fees/view-fees');
          this.isFeesSaving = true;
        },
        error: (err) => {
          console.log(err);
          this.isFeesSaving = true;
          this.connectionToast.openToast();
        }
      })
  }

  getNewFeesCodeConfig(){
    this.feesApi.getNewFeesCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.feesForm.feesForm.controls.feesCode.disable();

          if(res.code)
            this.feesForm.feesForm.controls.feesCode.setValue(res.code);
          else
            this.feesForm.feesForm.controls.feesCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
