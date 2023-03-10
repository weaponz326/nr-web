import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ExecutiveFormComponent } from '../executive-form/executive-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ExecutivesApiService } from 'projects/association/src/app/services/modules-api/executives-api/executives-api.service';

import { Executive } from 'projects/association/src/app/models/modules/executives/executives.model';


@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.component.html',
  styleUrls: ['./add-executive.component.scss']
})
export class AddExecutiveComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private executivesApi: ExecutivesApiService,
  ) { }

  @ViewChild('executiveFormComponentReference', { read: ExecutiveFormComponent, static: false }) executiveForm!: ExecutiveFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Executive", url: "/home/executives/new-executive" },
  ];

  isExecutiveSaving = false;

  ngOnInit(): void {
    this.getNewExecutiveCodeConfig();
  }

  postExecutive(){
    console.log('u are saving a new executive');

    var data: Executive = {
      account: this.customCookie.getCookie('association_id') as string,
      name: this.executiveForm.selectedMemberId,
      position: this.executiveForm.executiveForm.controls.position.value as string,
      fiscal_year: this.executiveForm.selectedYearId
    }

    console.log(data);
    this.isExecutiveSaving = true;

    this.executivesApi.postExecutive(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isExecutiveSaving = false;

          sessionStorage.setItem('association_executive_id', res.id);
          this.router.navigateByUrl('/home/executives/view-executive');
        },
        error: (err) => {
          console.log(err);
          this.isExecutiveSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewExecutiveCodeConfig(){
    this.executivesApi.getNewExecutiveCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          // if(res.code){
          //   this.executiveForm.executiveForm.controls.executiveCode.setValue(res.code);
          //   this.executiveForm.executiveForm.controls.executiveCode.disable();
          // }
          // else{
          //   this.executiveForm.executiveForm.controls.executiveCode.enable();
          // }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }


}
