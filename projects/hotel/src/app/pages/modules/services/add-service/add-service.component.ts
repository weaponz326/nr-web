import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectGuestComponent } from '../../../../components/select-windows/guests-windows/select-guest/select-guest.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ServicesApiService } from 'projects/hotel/src/app/services/modules-api/services-api/services-api.service';

import { Service } from 'projects/hotel/src/app/models/modules/services/services.model';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private servicesApi: ServicesApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('selectGuestComponentReference', { read: SelectGuestComponent, static: false }) selectGuest!: SelectGuestComponent;

  isServiceSaving = false;

  serviceForm = new FormGroup({
    serviceCode: new FormControl(''),
    serviceName: new FormControl(''),
    serviceType: new FormControl(''),
    guestCode: new FormControl({value: '', disabled: true}),
    guestName: new FormControl({value: '', disabled: true}),
  })

  selectedGuestId = '';

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.getNewServiceCodeConfig();
  }

  createService(){
    let data: Service = {
      account: this.customCookie.getCookie('hotel_id') as string,
      guest: this.selectedGuestId,
      service_code: this.serviceForm.controls.serviceCode.value as string,
      service_name: this.serviceForm.controls.serviceName.value as string,
      service_type: this.serviceForm.controls.serviceType.value as string,
      service_total: 0
    }

    console.log(data);
    this.isServiceSaving = true;

    this.servicesApi.postService(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hotel_service_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isServiceSaving = false;
            this.router.navigateByUrl('/home/services/view-service');
          }
        },
        error: (err) => {
          console.log(err);
          this.isServiceSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewServiceCodeConfig(){
    this.serviceForm.controls.serviceCode.disable();

    // this.servicesApi.getNewServiceCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.serviceForm.controls.serviceCode.setValue(res.code);
    //       else
    //         this.serviceForm.controls.serviceCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }
  
  openGuestWindow(){
    console.log("You are opening select guest window")
    this.selectGuest.openModal();
  }

  onGuestSelected(guestData: any){
    console.log(guestData);

    this.selectedGuestId = guestData.id;
    this.serviceForm.controls.guestName.setValue(guestData.guest_name);
    this.serviceForm.controls.guestCode.setValue(guestData.guest_code);
  }

}
