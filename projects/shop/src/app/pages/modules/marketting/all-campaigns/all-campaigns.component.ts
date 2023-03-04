import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { MarkettingApiService } from 'projects/shop/src/app/services/modules-api/marketting-api/marketting-api.service';
// import { MarkettingPrintService } from 'projects/shop/src/app/services/modules-printing/marketting-print/marketting-print.service';


@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrls: ['./all-campaigns.component.scss']
})
export class AllCampaignsComponent implements OnInit {

  constructor(
    private router: Router,
    // private markettingApi: MarkettingApiService,
    // private markettingPrint: MarkettingPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Campaigns", url: "/home/marketting/all-campaigns" },
  ];

  campaignsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  sortParams = {
    field: "created_at",
    direction: "desc"
  }

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountCampaign(1, 20, "-created_at");
  }

  getAccountCampaign(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

  //   this.markettingApi.getAccountCampaign(page, size, sortField)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.campaignsGridData = res.results;

  //         this.currentPage = res.current_page;
  //         this.totalPages = res.total_pages;
  //         this.totalItems = res.count;

  //         this.isFetchingGridData = false;
  //         if(this.totalItems == 0)
  //           this.isDataAvailable = false          
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.isFetchingGridData = false;
  //         this.connectionToast.openToast();
  //       }
  //     })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountCampaign(1, 20, column);

    this.currentSortColumn = column;
  }

  viewCampaign(campaignId: any){
    console.log(campaignId);

    sessionStorage.setItem('shop_campaign_id', campaignId);
    this.router.navigateByUrl('/home/marketting/view-campaign');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.markettingPrint.printAllMarketting();
  }

}
