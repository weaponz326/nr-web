import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LaboratoryApiService } from 'projects/hospital/src/app/services/modules-api/laboratory-api/laboratory-api.service';

// import { Lab } from 'projects/hospital/src/app/models/modules/laboratory/laboratory.model';


@Component({
  selector: 'app-new-lab',
  templateUrl: './new-lab.component.html',
  styleUrls: ['./new-lab.component.scss']
})
export class NewLabComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private labApi: LaboratoryApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isLabSaving = false;

  labForm = new FormGroup({
    labCode: new FormControl(''),
    labDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    labType: new FormControl(''),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.labForm.controls.labDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewLabCodeConfig();
  }

  createLab(){
    // let data: Lab = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      lab_code: this.labForm.controls.labCode.value as string,
      lab_date: this.labForm.controls.labDate.value as string,
      lab_type: this.labForm.controls.labType.value as string,
    }

    console.log(data);
    this.isLabSaving = true;

    this.labApi.postLab(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hospital_lab_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isLabSaving = false;
            this.router.navigateByUrl('/home/laboratory/view-lab');
          }
        },
        error: (err) => {
          console.log(err);
          this.isLabSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewLabCodeConfig(){
    this.labForm.controls.labCode.disable();

    this.labApi.getNewLabCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.labForm.controls.labCode.setValue(res.code);
          else
            this.labForm.controls.labCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
