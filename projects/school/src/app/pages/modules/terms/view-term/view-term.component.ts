import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TermFormComponent } from '../term-form/term-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { TermsApiService } from 'projects/school/src/app/services/modules/terms-api/terms-api.service';
// import { TermsPrintService } from 'projects/school/src/app/services/printing/terms-print/terms-print.service';

// import { ActiveTerm } from 'projects/school/src/app/models/modules/terms/terms.model';


@Component({
  selector: 'app-view-term',
  templateUrl: './view-term.component.html',
  styleUrls: ['./view-term.component.scss']
})
export class ViewTermComponent implements OnInit {

  constructor(
    private router: Router,
    // private termsApi: TermsApiService,
    // private termsPrint: TermsPrintService,
  ) { }

  @ViewChild('termFormComponentReference', { read: TermFormComponent, static: false }) termForm!: TermFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

  navHeading: any[] = [
    { text: "All Terms", url: "/home/terms/all-terms" },
    { text: "View Term", url: "/home/terms/view-term" },
  ];

  termData: any;

  isTermLoading = false;
  isTermSaving = false;
  isTermDeleting = false;

  isActiveTermSaving = false;

  ngOnInit(): void {
    this.getTerm();
  }

  getTerm(){
    this.isTermLoading = true;

    // this.termsApi.getTerm()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.termData = res;
    //       this.isTermLoading = false;

    //       this.termForm.termForm.controls.termCode.setValue(this.termData.data().term_code);
    //       this.termForm.termForm.controls.termName.setValue(this.termData.data().term_name);
    //       this.termForm.termForm.controls.academicYear.setValue(this.termData.data().academic_year);
    //       this.termForm.termForm.controls.startDate.setValue(this.termData.data().start_date);
    //       this.termForm.termForm.controls.endDate.setValue(this.termData.data().end_date);
    //       this.termForm.termForm.controls.termStatus.setValue(this.termData.data().term_status);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTermLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateTerm(){
    console.log('u are saving a new term');

    var data = {
      term_code: this.termForm.termForm.controls.termCode.value,
      term_name: this.termForm.termForm.controls.termName.value,
      academic_year: this.termForm.termForm.controls.academicYear.value,
      start_date: this.termForm.termForm.controls.startDate.value,
      end_date: this.termForm.termForm.controls.endDate.value,
      term_status: this.termForm.termForm.controls.termStatus.value,
    }

    console.log(data);
    this.isTermSaving = true;

    // this.termsApi.updateTerm(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isTermSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTermSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteTerm(){
    this.isTermDeleting = true;

    // this.termsApi.deleteTerm()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/terms/all-terms');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createActiveTerm(){
    this.isActiveTermSaving = true;

    // let data: ActiveTerm = {
    //   id: sessionStorage.getItem('school_term_id') as string,
    //   data: {
    //     term_code: this.termForm.termForm.controls.termCode.value,
    //     term_name: this.termForm.termForm.controls.termName.value,
    //   }
    // };

    // console.log(data);

    // this.termsApi.createActiveTerm(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isActiveTermSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isActiveTermSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.termsPrint.printViewTerm();
  }

}
