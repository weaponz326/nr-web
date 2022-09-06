import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { NewMenuGroupComponent } from '../new-menu-group/new-menu-group.component';

import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';


@Component({
  selector: 'app-all-menu-groups',
  templateUrl: './all-menu-groups.component.html',
  styleUrls: ['./all-menu-groups.component.scss']
})
export class AllMenuGroupsComponent implements OnInit {

  constructor(
    private router: Router,
    private menuApi: MenuApiService,
    // private menuPrint: MenuPrintService,
  ) { }

  @ViewChild('newMenuGroupComponentReference', { read: NewMenuGroupComponent, static: false }) newMenuGroup!: NewMenuGroupComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Menu Groups", url: "/home/menu/all-menu-groups" },
  ];

  menuGroupGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountMenuGroup(1, 20, "-created_at");
  }

  getAccountMenuGroup(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.menuApi.getAccountMenuGroup(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.menuGroupGridData = res.results;

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
    this.getAccountMenuGroup(1, 20, column);

    this.currentSortColumn = column;
  }

  viewMenuGroup(menuGroupId: any){
    console.log(menuGroupId);

    sessionStorage.setItem("restaurant_menu_group_id", menuGroupId);
    this.router.navigateByUrl("/home/menu/view-menu-group");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.menuPrint.printAllMenuGroup();
  }

}
