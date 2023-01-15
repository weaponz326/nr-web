import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { HousekeepingsApiService } from 'projects/hotel/src/app/services/modules-api/housekeepings-api/housekeepings-api.service';

// import { Housekeeping } from 'projects/hotel/src/app/models/modules/housekeepings/housekeepings.model';


@Component({
  selector: 'app-new-housekeeping',
  templateUrl: './new-housekeeping.component.html',
  styleUrls: ['./new-housekeeping.component.scss']
})
export class NewHousekeepingComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private housekeepingsApi: HousekeepingsApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isHousekeepingSaving = false;

  housekeepingForm = new FormGroup({
    housekeepingCode: new FormControl(''),
    housekeepingDate: new FormControl(),
    roomNumber: new FormControl({value: '', disabled: true}),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.housekeepingForm.controls.housekeepingDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewHousekeepingCodeConfig();
  }

  createHousekeeping(){
    // let data: Housekeeping = {
    let data = {
      account: this.customCookie.getCookie('hotel_id') as string,
      housekeeping_code: this.housekeepingForm.controls.housekeepingCode.value as string,
      housekeeping_date: this.housekeepingForm.controls.housekeepingDate.value as string,
    }

    console.log(data);
    this.isHousekeepingSaving = true;

    // this.housekeepingsApi.postHousekeeping(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         sessionStorage.setItem('hotel_housekeeping_id', res.id);

    //         this.dismissButton.nativeElement.click();
    //         this.isHousekeepingSaving = false;
    //         this.router.navigateByUrl('/home/housekeepings/view-housekeeping');
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isHousekeepingSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })

    console.log(data);
  }

  getNewHousekeepingCodeConfig(){
    this.housekeepingForm.controls.housekeepingCode.disable();

    // this.housekeepingsApi.getNewHousekeepingCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.housekeepingForm.controls.housekeepingCode.setValue(res.code);
    //       else
    //         this.housekeepingForm.controls.housekeepingCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
