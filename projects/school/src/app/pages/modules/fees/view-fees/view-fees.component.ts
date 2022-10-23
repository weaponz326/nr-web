import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { FeesFormComponent } from '../fees-form/fees-form.component';
// import { FeesTargetComponent } from '../fees-target/fees-target.component';
import { FeesItemsComponent } from '../fees-items/fees-items.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { FeesApiService } from 'projects/school/src/app/services/modules-api/fees-api/fees-api.service';
// import { FeesPrintService } from 'projects/school/src/app/services/printing/fees-print/fees-print.service';

import { Fees } from 'projects/school/src/app/models/modules/fees/fees.model';


@Component({
  selector: 'app-view-fees',
  templateUrl: './view-fees.component.html',
  styleUrls: ['./view-fees.component.scss']
})
export class ViewFeesComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private feesApi: FeesApiService,
    // private feesPrint: FeesPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('feesFormComponentReference', { read: FeesFormComponent, static: false }) feesForm!: FeesFormComponent;
  // @ViewChild('feesTargetComponentReference', { read: FeesTargetComponent, static: false }) feesTarget!: FeesTargetComponent;
  @ViewChild('feesItemsComponentReference', { read: FeesItemsComponent, static: false }) feesItems!: FeesItemsComponent;

  navHeading: any[] = [
    { text: "All Fees", url: "/home/fees/all-fees" },
    { text: "View Fees", url: "/home/fees/view-fees" },
  ];

  feesFormData: any;

  isFeesLoading = false;
  isFeesSaving = false;
  isFeesDeleting = false;

  ngOnInit(): void {
    this.getFees();
  }

  getFees(){
    this.isFeesLoading = true;

    this.feesApi.getFees()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.feesFormData = res;
          this.isFeesLoading = false;

          this.feesForm.feesForm.controls.feesCode.setValue(this.feesFormData.fees_code);
          this.feesForm.feesForm.controls.feesName.setValue(this.feesFormData.fees_name);
          this.feesForm.feesForm.controls.feesDate.setValue(this.feesFormData.fees_date);
          this.feesForm.feesForm.controls.term.setValue(this.feesFormData.term.term_name);
          this.feesForm.feesForm.controls.feesDescription.setValue(this.feesFormData.fees_description);

          this.feesForm.selectedTermId = this.feesFormData.term.id;
          this.feesForm.selectedTermData = this.feesFormData.term.data;
        },
        error: (err: any) => {
          console.log(err);
          this.isFeesLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putFees(){
    let data: Fees = {
      account: this.customCookie.getCookie('school_id') as string,
      fees_code: this.feesForm.feesForm.controls.feesCode.value as string,
      fees_name: this.feesForm.feesForm.controls.feesName.value as string,
      fees_date: this.feesForm.feesForm.controls.feesDate.value,
      fees_description: this.feesForm.feesForm.controls.feesDescription.value as string,
      term: this.feesForm.selectedTermId,
    }

    console.log(data);
    this.isFeesSaving = true;

    this.feesApi.putFees(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFeesSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isFeesSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteFees(){
    this.isFeesDeleting = true;

    this.feesApi.deleteFees()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/fees/all-fees');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.feesPrint.printViewFees();
  }

}
