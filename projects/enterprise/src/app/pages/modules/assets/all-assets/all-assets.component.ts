import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.scss']
})
export class AllAssetsComponent implements OnInit {

  constructor(
    private router: Router,
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


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountAssets(1, 20, column);

    this.currentSortColumn = column;
  }

  viewAsset(assetId: any){
    console.log(assetId);

    sessionStorage.setItem("enterprise_asset_id", assetId);
    this.router.navigateByUrl("/home/assets/view-asset");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assetsPrint.printAllAssets();
  }

}
