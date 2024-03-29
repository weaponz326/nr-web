import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AppraisalFormComponent } from '../appraisal-form/appraisal-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AppraisalApiService } from 'projects/enterprise/src/app/services/modules-api/appraisal-api/appraisal-api.service';

import { Appraisal } from 'projects/enterprise/src/app/models/modules/appraisal/appraisal.model';


@Component({
  selector: 'app-new-appraisal',
  templateUrl: './new-appraisal.component.html',
  styleUrls: ['./new-appraisal.component.scss']
})
export class NewAppraisalComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private appraisalApi: AppraisalApiService
  ) { }

  @ViewChild('appraisalFormComponentReference', { read: AppraisalFormComponent, static: false }) appraisalForm!: AppraisalFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Add Appraisal", url: "/home/appraisal/add-appraisal" },
  ];

  isAppraisalaving = false;

  ngOnInit(): void {
    this.getNewAppraisalCodeConfig();
  }

  postAppraisal(){
    console.log('u are saving a new appraisal');

    var data: Appraisal = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      employee: this.appraisalForm.selectedEmployeeId,
      appraisal_code: this.appraisalForm.appraisalForm.controls.appraisalCode.value as string,
      appraisal_name: this.appraisalForm.appraisalForm.controls.appraisalName.value as string,
      start_date: this.appraisalForm.appraisalForm.controls.startDate.value,
      end_date: this.appraisalForm.appraisalForm.controls.endDate.value,
      supervisor: this.appraisalForm.appraisalForm.controls.supervisor.value as string,
    }

    console.log(data);
    this.isAppraisalaving = true;

    this.appraisalApi.postAppraisal(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isAppraisalaving = false;

          sessionStorage.setItem('enterprise_appraisal_id', res.id);
          this.router.navigateByUrl('/home/appraisal/view-appraisal');
        },
        error: (err) => {
          console.log(err);
          this.isAppraisalaving = false;
          this.connectionToast.openToast();
        }
      }) 
  }

  getNewAppraisalCodeConfig(){
    
    
  }

}
