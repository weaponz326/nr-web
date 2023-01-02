import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { SettingsApiService } from 'projects/hotel/src/app/services/modules-api/settings-api/settings-api.service';


@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss']
})
export class PaymentsHistoryComponent implements OnInit {

  constructor(private settingsApi: SettingsApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Subscription", url: "/home/settings/billing" },
    { text: "Subscription History", url: "/home/settings/payments-history" },
  ];

  historyData: any;

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getHistory(1, 20, "-created_at");
  }

  getHistory(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.settingsApi.getAccountSubscriptionEvent(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.historyData = res;
          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingGridData = false;
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getHistory(1, 20, column);

    this.currentSortColumn = column;
  }

}
