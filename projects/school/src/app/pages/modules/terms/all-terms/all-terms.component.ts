import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { TermsApiService } from 'projects/school/src/app/services/modules-api/terms-api/terms-api.service';
// import { TermsPrintService } from 'projects/school/src/app/services/printing/terms-print/terms-print.service';


@Component({
  selector: 'app-all-terms',
  templateUrl: './all-terms.component.html',
  styleUrls: ['./all-terms.component.scss']
})
export class AllTermsComponent implements OnInit {

  constructor(
    private router: Router,
    private termsApi: TermsApiService,
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
    this.getAccountTerm(1, 20, "-created_at");
  }

  getActiveTerm(){
    this.isLoadingActiveTerm = true;

    this.termsApi.getActiveTerm()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.activeTermId = res.term.id;
          this.activeTermName = res.term.term_name;
          this.isLoadingActiveTerm = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isLoadingActiveTerm = false;
        }
      })
  }

  getAccountTerm(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.termsApi.getAccountTerm(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.termsGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountTerm(1, 20, column);

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
