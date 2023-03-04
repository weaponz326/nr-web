import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { DispensaryApiService } from 'projects/hospital/src/app/services/modules-api/dispensary-api/dispensary-api.service';

// import { Dispense } from 'projects/hospital/src/app/models/modules/dispensary/dispensary.model';


@Component({
  selector: 'app-new-dispense',
  templateUrl: './new-dispense.component.html',
  styleUrls: ['./new-dispense.component.scss']
})
export class NewDispenseComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private dispensesApi: DispensaryApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isDispenseSaving = false;

  dispenseForm = new FormGroup({
    dispenseCode: new FormControl(''),
    dispenseDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    prescriptionCode: new FormControl(''),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.dispenseForm.controls.dispenseDate.setValue(new Date().toISOString().slice(0, 10));
    this.getNewDispenseCodeConfig();
  }

  createDispense(){
    // let data: Dispense = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      dispense_code: this.dispenseForm.controls.dispenseCode.value as string,
      dispense_date: this.dispenseForm.controls.dispenseDate.value as string,
    }

    console.log(data);
    this.isDispenseSaving = true;

    this.dispensesApi.postDispense(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hospital_dispense_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isDispenseSaving = false;
            this.router.navigateByUrl('/home/dispensary/view-dispense');
          }
        },
        error: (err) => {
          console.log(err);
          this.isDispenseSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewDispenseCodeConfig(){
    this.dispenseForm.controls.dispenseCode.disable();

    this.dispensesApi.getNewDispenseCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.dispenseForm.controls.dispenseCode.setValue(res.code);
          else
            this.dispenseForm.controls.dispenseCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
