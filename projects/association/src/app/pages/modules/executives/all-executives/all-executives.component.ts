import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { ExecutivesApiService } from 'projects/association/src/app/services/modules-api/executives-api/executives-api.service';
// import { ExecutivesPrintService } from 'projects/association/src/app/services/modules-printing/executives-print/executives-print.service';


@Component({
  selector: 'app-all-executives',
  templateUrl: './all-executives.component.html',
  styleUrls: ['./all-executives.component.scss']
})
export class AllExecutivesComponent implements OnInit {

  constructor(
    private router: Router,
    private executivesApi: ExecutivesApiService,
    // private executivesPrint: ExecutivesPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Executives", url: "/home/executives/all-executives" },
  ];

  executivesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountExecutive(1, 20, "-created_at");
  }

  getAccountExecutive(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.executivesApi.getAccountExecutive(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.executivesGridData = res.results;

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
    this.getAccountExecutive(1, 20, column);

    this.currentSortColumn = column;
  }

  viewExecutive(executiveId: any){
    console.log(executiveId);

    sessionStorage.setItem('association_executive_id', executiveId);
    this.router.navigateByUrl('/home/executives/view-executive');
  }


  onPrint(){
    console.log("lets start printing...");
    // this.executivesPrint.printAllExecutives();
  }

}
