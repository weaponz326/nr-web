import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AssetsApiService } from 'projects/hotel/src/app/services/modules-api/assets-api/assets-api.service';


@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.scss']
})
export class AllAssetsComponent implements OnInit {

  constructor(
    private router: Router,
    private assetsApi: AssetsApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Assets", url: "/home/assets/all-assets" },
  ];

  assetsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountAssets(1, 20, "-created_at");
  }

  getAccountAssets(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    this.assetsApi.getAccountAsset(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.assetsGridData = res.results;

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
    this.getAccountAssets(1, 20, column);

    this.currentSortColumn = column;
  }

  viewAsset(assetId: any){
    console.log(assetId);

    sessionStorage.setItem("hotel_asset_id", assetId);
    this.router.navigateByUrl("/home/assets/view-asset");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assetsPrint.printAllAssets();
  }

}
