import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-loading',
  templateUrl: './table-loading.component.html',
  styleUrls: ['./table-loading.component.scss']
})
export class TableLoadingComponent implements OnInit {

  constructor() { }

  @Input() loaderSize = "";
  @Input() isLoading = false;
  @Input() isNoData = false;

  ngOnInit(): void {
  }

}
