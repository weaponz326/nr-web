import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { WardFormComponent } from '../ward-form/ward-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { WardsApiService } from 'projects/hospital/src/app/services/modules-api/wards-api/wards-api.service';

// import { Ward } from 'projects/hospital/src/app/models/modules/wards/wards.model';


@Component({
  selector: 'app-new-ward',
  templateUrl: './new-ward.component.html',
  styleUrls: ['./new-ward.component.scss']
})
export class NewWardComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private wardsApi: WardsApiService,
  ) { }

  @ViewChild('wardFormComponentReference', { read: WardFormComponent, static: false }) wardForm!: WardFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Ward", url: "/home/wards/new-ward" },
  ];

  isWardSaving = false;

  ngOnInit(): void {
    this.getNewWardCodeConfig();
  }

  postWard(){
    // let data: Ward = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      ward_number: this.wardForm.wardForm.controls.wardNumber.value as string,
      ward_name: this.wardForm.wardForm.controls.wardName.value as string,
      ward_type: this.wardForm.wardForm.controls.wardType.value as string,
      location: this.wardForm.wardForm.controls.location.value as string,
      capacity: this.wardForm.wardForm.controls.capacity.value as number,
    }

    this.isWardSaving = true;

    // this.wardsApi.postWard(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isWardSaving = false;

    //       sessionStorage.setItem('hospital_ward_id', res.id);
    //       this.router.navigateByUrl('/home/wards/view-ward');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isWardSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   }) 
  }

  getNewWardCodeConfig(){
    
    
  }

}
