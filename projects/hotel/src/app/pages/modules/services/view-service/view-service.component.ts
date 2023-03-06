import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { ServiceItemsComponent } from '../service-items/service-items.component';

import { SelectGuestComponent } from '../../../../components/select-windows/guests-windows/select-guest/select-guest.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ServicesApiService } from 'projects/hotel/src/app/services/modules-api/services-api/services-api.service';
// import { ServicesPrintService } from 'projects/hotel/src/app/services/modules-printing/services-print/services-print.service';

import { Service } from 'projects/hotel/src/app/models/modules/services/services.model';


@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.scss']
})
export class ViewServiceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private servicesApi: ServicesApiService,
    // private servicesPrint: ServicesPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('serviceItemsComponentReference', { read: ServiceItemsComponent, static: false }) serviceItems!: ServiceItemsComponent;

  @ViewChild('selectGuestComponentReference', { read: SelectGuestComponent, static: false }) selectGuest!: SelectGuestComponent;

  navHeading: any[] = [
    { text: "All Services", url: "/home/services/all-services" },
    { text: "View Service", url: "/home/services/view-service" },
  ];

  serviceFormData: any;

  isServiceLoading: boolean = false;
  isServiceSaving: boolean = false;
  isServiceDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  serviceForm = new FormGroup({
    serviceCode: new FormControl(''),
    serviceName: new FormControl(''),
    serviceType: new FormControl(''),
    guestCode: new FormControl({value: '', disabled: true}),
    guestName: new FormControl({value: '', disabled: true}),
  })

  selectedGuestId = '';

  ngOnInit(): void {
    this.getService();
  }

  getService(){
    this.isServiceLoading = true;

    this.servicesApi.getService()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.serviceFormData = res;
          this.isServiceLoading = false;

          this.serviceForm.controls.serviceCode.setValue(this.serviceFormData.service_code);
          this.serviceForm.controls.serviceName.setValue(this.serviceFormData.service_name);
          this.serviceForm.controls.serviceType.setValue(this.serviceFormData.service_type);

          this.selectedGuestId = this.serviceFormData.guest?.id;
          this.serviceForm.controls.guestName.setValue(this.serviceFormData.guest?.guest_name);
          this.serviceForm.controls.guestCode.setValue(this.serviceFormData.guest?.guest_code);
        },
        error: (err) => {
          console.log(err);
          this.isServiceLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putService(){
    let data: Service = {
      account: this.customCookie.getCookie('hotel_id') as string,
      guest: this.selectedGuestId,
      service_code: this.serviceForm.controls.serviceCode.value as string,
      service_name: this.serviceForm.controls.serviceName.value as string,
      service_type: this.serviceForm.controls.serviceType.value as string,
      service_total: this.serviceItems.totalAmount
    }

    console.log(data);
    this.isServiceSaving = true;

    this.servicesApi.putService(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isServiceSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isServiceSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteService(){
    this.isServiceDeleting = true;

    this.servicesApi.deleteService()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/services/all-services');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
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

  onPrint(){
    console.log("lets start printing...");
    // this.servicesPrint.printViewService();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.servicesPrint.printServiceRoll();
  }

}
