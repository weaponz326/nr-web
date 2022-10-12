import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'
// import { FeesTargetComponent } from '../fees-target/fees-target.component';
import { FeesItemsComponent } from '../fees-items/fees-items.component';
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { FeesApiService } from 'projects/school/src/app/services/modules/fees-api/fees-api.service';
// import { FeesPrintService } from 'projects/school/src/app/services/printing/fees-print/fees-print.service';

// import { Fees } from 'projects/school/src/app/models/modules/fees/fees.model';


@Component({
  selector: 'app-view-fees',
  templateUrl: './view-fees.component.html',
  styleUrls: ['./view-fees.component.scss']
})
export class ViewFeesComponent implements OnInit {

  constructor(
    private router: Router,
    // private feesApi: FeesApiService,
    // private feesPrint: FeesPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;
  // @ViewChild('feesTargetComponentReference', { read: FeesTargetComponent, static: false }) feesTarget!: FeesTargetComponent;
  @ViewChild('feesItemsComponentReference', { read: FeesItemsComponent, static: false }) feesItems!: FeesItemsComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Fees", url: "/home/fees/all-fees" },
    { text: "View Fees", url: "/home/fees/view-fees" },
  ];

  feesFormData: any;

  selectedTermId = "";
  selectedTermData = {};

  isFeesLoading = false;
  isFeesSaving = false;
  isFeesDeleting = false;

  feesForm = new FormGroup({
    feesCode: new FormControl(''),
    feesDate: new FormControl(''),
    feesName: new FormControl(''),
    feesDescription: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
    this.getFees();
  }

  getFees(){
    this.isFeesLoading = true;

    // this.feesApi.getFees()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.feesFormData = res;
    //       this.isFeesLoading = false;

    //       this.feesForm.controls.feesCode.setValue(this.feesFormData.data().fees_code);
    //       this.feesForm.controls.feesName.setValue(this.feesFormData.data().fees_name);
    //       this.feesForm.controls.feesDate.setValue(this.feesFormData.data().fees_date);
    //       this.feesForm.controls.term.setValue(this.feesFormData.data().term.data.term_name);
    //       this.feesForm.controls.feesDescription.setValue(this.feesFormData.data().fees_description);

    //       this.selectedTermId = this.feesFormData.data().term.id;
    //       this.selectedTermData = this.feesFormData.data().term.data;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFeesLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateFees(){
    let data = {
      fees_code: this.feesForm.controls.feesCode.value,
      fees_name: this.feesForm.controls.feesName.value,
      fees_date: this.feesForm.controls.feesDate.value,
      fees_description: this.feesForm.controls.feesDescription.value,
      term: this.selectedTermId,
    }

    console.log(data);
    this.isFeesSaving = true;

    // this.feesApi.updateFees(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isFeesSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFeesSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteFees(){
    this.isFeesDeleting = true;

    // this.feesApi.deleteFees()
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/fees/all-fees');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.feesForm.controls.term.setValue(termData.data().term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.feesPrint.printViewFees();
  }

}
