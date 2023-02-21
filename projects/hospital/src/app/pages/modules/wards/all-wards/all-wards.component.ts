import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewWardComponent } from '../new-ward/new-ward.component'

import { WardsApiService } from 'projects/hospital/src/app/services/modules-api/wards-api/wards-api.service';


@Component({
  selector: 'app-all-wards',
  templateUrl: './all-wards.component.html',
  styleUrls: ['./all-wards.component.scss']
})
export class AllWardsComponent implements OnInit {

  constructor(
    private router: Router,
    private wardsApi: WardsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newWardComponentReference', { read: NewWardComponent, static: false }) newWard!: NewWardComponent;

  navHeading: any[] = [
    { text: "All Ward", url: "/home/wards/all-wards" },
  ];

  activeTermName: any;

  wardsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountWard(1, 20, "-created_at");
  }

  getAccountWard(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.wardsApi.getAccountWard(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.wardsGridData = res.results;

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
    this.getAccountWard(1, 20, column);

    this.currentSortColumn = column;
  }

  viewWard(wardId: any){
    console.log(wardId);

    sessionStorage.setItem('association_ward_id', wardId);
    this.router.navigateByUrl('/home/wards/view-ward');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.wardPrint.printAllWard();
  }

}
