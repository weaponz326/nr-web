import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ExecutiveFormComponent } from '../executive-form/executive-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ExecutivesApiService } from 'projects/association/src/app/services/modules-api/executives-api/executives-api.service';
// import { ExecutivesPrintService } from 'projects/association/src/app/services/modules-printing/executives-print/executives-print.service';

import { Executive } from 'projects/association/src/app/models/modules/executives/executives.model';


@Component({
  selector: 'app-view-executive',
  templateUrl: './view-executive.component.html',
  styleUrls: ['./view-executive.component.scss']
})
export class ViewExecutiveComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private executivesApi: ExecutivesApiService,
    // private executivesPrint: ExecutivesPrintService,
  ) { }

  @ViewChild('executiveFormComponentReference', { read: ExecutiveFormComponent, static: false }) executiveForm!: ExecutiveFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Executives", url: "/home/executives/all-executives" },
    { text: "View Executive", url: "/home/executives/view-executive" },
  ];

  executiveData: any;

  isExecutiveLoading = false;
  isExecutiveSaving = false;
  isExecutiveDeleting = false;

  ngOnInit(): void {
    this.getExecutive();
    this.getExecutiveCodeConfig();
  }

  getExecutive(){
    this.isExecutiveLoading = true;

    this.executivesApi.getExecutive()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.executiveData = res;
          this.isExecutiveLoading = false;

          this.executiveForm.executiveForm.controls.name.setValue(this.executiveData.name?.first_name + " " + this.executiveData.name?.last_name);
          this.executiveForm.executiveForm.controls.position.setValue(this.executiveData.position);
          this.executiveForm.executiveForm.controls.fiscalYear.setValue(this.executiveData.fiscal_year?.year_name);

          this.executiveForm.selectedMemberId = this.executiveData.executive_chairman.id
          this.executiveForm.selectedYearId = this.executiveData.fiscal_year.id
        },
        error: (err) => {
          console.log(err);
          this.isExecutiveLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putExecutive(){
    console.log('u are saving a new executive');

    var data: Executive = {
      account: this.customCookie.getCookie('association_id') as string,
      name: this.executiveForm.selectedMemberId,
      position: this.executiveForm.executiveForm.controls.position.value as string,
      fiscal_year: this.executiveForm.selectedYearId
    }

    console.log(data);
    this.isExecutiveSaving = true;

    this.executivesApi.putExecutive(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isExecutiveSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isExecutiveSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteExecutive(){
    this.isExecutiveDeleting = true;

    this.executivesApi.deleteExecutive()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/executives/all-executives');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })    
  }

  getExecutiveCodeConfig(){
    this.executivesApi.getExecutiveCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          // if (res.entry_mode == "Auto")
          //   this.executiveForm.executiveForm.controls.executiveCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.executivesPrint.printViewExecutive();
  }

}
