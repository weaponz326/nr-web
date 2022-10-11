import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { TermsApiService } from 'projects/school/src/app/services/modules/terms-api/terms-api.service';
// import { TermsPrintService } from 'projects/school/src/app/services/printing/terms-print/terms-print.service';


@Component({
  selector: 'app-all-terms',
  templateUrl: './all-terms.component.html',
  styleUrls: ['./all-terms.component.scss']
})
export class AllTermsComponent implements OnInit {

  constructor(
    private router: Router,
    // private termsApi: TermsApiService,
    // private termsPrint: TermsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Terms", url: "/home/terms/all-terms" },
  ];

  activeTermId = "";
  activeTermName = "";
  isLoadingActiveTerm = false;

  termsGridData: any[] = [];
  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountTerm();
  }

  getActiveTerm(){
    this.isLoadingActiveTerm = true;

    // this.termsApi.getActiveTerm()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.activeTermId = res.data().id;
    //       this.activeTermName = res.data().data.term_name;
    //       this.isLoadingActiveTerm = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //       this.isLoadingActiveTerm = false;
    //     }
    //   )
  }

  getAccountTerm(){
    this.isFetchingGridData = true;

    // this.termsApi.getAccountTerm(this.sortParams, 20)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.termsGridData = res.docs;        },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountTerm();

    this.currentSortColumn = column;
  }

  viewTerm(termId: any){
    console.log(termId);

    sessionStorage.setItem('school_term_id', termId);
    this.router.navigateByUrl('/home/terms/view-term');
  }

  gotoActiveTerm(){
    console.log(this.activeTermId);

    sessionStorage.setItem('school_term_id', this.activeTermId);
    this.router.navigateByUrl('/home/terms/view-term');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.termsPrint.printAllTerms();
  }

}
