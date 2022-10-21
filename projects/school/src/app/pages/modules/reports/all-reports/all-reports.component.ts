import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewReportComponent } from '../new-report/new-report.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { ReportsApiService } from 'projects/school/src/app/services/modules-api/reports-api/reports-api.service';
// import { ReportsPrintService } from 'projects/school/src/app/services/printing/reports-print/reports-print.service';


@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.scss']
})
export class AllReportsComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private reportsApi: ReportsApiService,
    // private reportPrint: ReportPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newReportComponentReference', { read: NewReportComponent, static: false }) newReport!: NewReportComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Reports", url: "/home/reports/all-reports" },
  ];

  activeTermName: any;

  reportsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountReport(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountReport(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.reportsApi.getAccountReport(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.reportsGridData = res.results;

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
    this.getAccountReport(1, 20, column);

    this.currentSortColumn = column;
  }

  viewReport(reportId: any){
    console.log(reportId);

    sessionStorage.setItem('school_report_id', reportId);
    this.router.navigateByUrl('/home/reports/class-report');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountReport(1, 20, '-created_at');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.reportPrint.printAllReport();
  }

}
