import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AppraisalFormComponent } from '../appraisal-form/appraisal-form.component';
import { AppraisalSheetComponent } from '../appraisal-sheet/appraisal-sheet.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AppraisalApiService } from 'projects/enterprise/src/app/services/modules-api/appraisal-api/appraisal-api.service';

import { Appraisal } from 'projects/enterprise/src/app/models/modules/appraisal/appraisal.model';


@Component({
  selector: 'app-view-appraisal',
  templateUrl: './view-appraisal.component.html',
  styleUrls: ['./view-appraisal.component.scss']
})
export class ViewAppraisalComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private appraisalApi: AppraisalApiService
  ) { }

  @ViewChild('appraisalFormComponentReference', { read: AppraisalFormComponent, static: false }) appraisalForm!: AppraisalFormComponent;
  @ViewChild('appraisalSheetComponentReference', { read: AppraisalSheetComponent, static: false }) appraisalSheet!: AppraisalSheetComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Appraisal", url: "/home/appraisal/all-appraisal" },
    { text: "View Appraisal", url: "/home/appraisal/view-appraisal" },
  ];

  appraisalData: any;

  isAppraisalLoading = false;
  isAppraisalSaving = false;
  isAppraisalDeleting = false;

  ngOnInit(): void {
    this.getAppraisal();
  }

  getAppraisal(){
    this.isAppraisalLoading = true;

    this.appraisalApi.getAppraisal()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.appraisalData = res;
          this.isAppraisalLoading = false;

          this.appraisalForm.appraisalForm.controls.appraisalCode.setValue(this.appraisalData.appraisal_code);
          this.appraisalForm.appraisalForm.controls.appraisalName.setValue(this.appraisalData.appraisal_name);
          this.appraisalForm.appraisalForm.controls.employeeCode.setValue(this.appraisalData.employee?.employee_code);
          this.appraisalForm.appraisalForm.controls.employeeName.setValue(this.appraisalData.employee?.first_name + " " + this.appraisalData.employee?.last_name);
          this.appraisalForm.appraisalForm.controls.startDate.setValue(this.appraisalData.start_date);
          this.appraisalForm.appraisalForm.controls.endDate.setValue(this.appraisalData.end_date);
          this.appraisalForm.appraisalForm.controls.supervisor.setValue(this.appraisalData.supervisor);
        },
        error: (err) => {
          console.log(err);
          this.isAppraisalLoading = false;
          this.connectionToast.openToast();
        }
      })    
  }

  updateAppraisal(){
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
    this.isAppraisalSaving = true;

    this.appraisalApi.putAppraisal(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isAppraisalSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isAppraisalSaving = false;
          this.connectionToast.openToast();
        }
      })

    this.appraisalSheet.updateAppraisalSheet();
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteAppraisal(){
    this.isAppraisalDeleting = true;

    this.appraisalApi.deleteAppraisal()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/appraisal/all-appraisal');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      }) 

    this.appraisalSheet.deleteAppraisalSheet();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.appraisalPrint.printViewAppraisal();
  }

}
