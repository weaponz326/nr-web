import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AppraisalFormComponent } from '../appraisal-form/appraisal-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-appraisal',
  templateUrl: './view-appraisal.component.html',
  styleUrls: ['./view-appraisal.component.scss']
})
export class ViewAppraisalComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('appraisalFormComponentReference', { read: AppraisalFormComponent, static: false }) appraisalForm!: AppraisalFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Appraisal", url: "/home/appraisal/all-appraisal" },
    { text: "View Appraisal", url: "/home/appraisal/view-appraisal" },
  ];

  appraisalData: any;

  isAppraisalLoading = false;
  isAppraisalaving = false;
  isAppraisalDeleting = false;

  isActiveAppraisalaving = false;

  ngOnInit(): void {
    this.getAppraisal();
  }

  getAppraisal(){
    this.isAppraisalLoading = true;

    
  }

  updateAppraisal(){
    console.log('u are saving a new appraisal');

    var data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      appraisal_code: this.appraisalForm.appraisalForm.controls.appraisalCode.value as string,
      appraisal_name: this.appraisalForm.appraisalForm.controls.appraisalName.value as string,
      start_date: this.appraisalForm.appraisalForm.controls.startDate.value,
      end_date: this.appraisalForm.appraisalForm.controls.endDate.value,
      supervisor: this.appraisalForm.appraisalForm.controls.supervisor.value as string,
    }

    console.log(data);
    this.isAppraisalaving = true;

    
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteAppraisal(){
    this.isAppraisalDeleting = true;

    
  }

  putActiveAppraisal(){
    this.isActiveAppraisalaving = true;

    let data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      appraisal: sessionStorage.getItem('enterprise_appraisal_id') as string,
    };

    console.log(data);

    
  }

  onPrint(){
    console.log("lets start printing...");
    // this.appraisalPrint.printViewAppraisal();
  }

}
