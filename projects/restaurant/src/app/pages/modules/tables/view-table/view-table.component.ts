import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TableFormComponent } from '../table-form/table-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { TablesPrintService } from 'projects/restaurant/src/app/services/printing/tables-print/tables-print.service';

import { Table } from 'projects/restaurant/src/app/models/modules/tables/tables.model';


@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    // private tablesPrint: TablesPrintService
  ) { }

  @Output() saveTableEvent = new EventEmitter<any>();
  @Output() deleteTableEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('tableFormComponentReference', { read: TableFormComponent, static: false }) tableForm!: TableFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  tableData: any;

  isTableSaving = false;
  isTableDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.tableData = data;

    this.tableForm.tableForm.controls.tableNumber.setValue(data.table_number);
    this.tableForm.tableForm.controls.tableType.setValue(data.table_type);
    this.tableForm.tableForm.controls.capacity.setValue(data.capacity);
    this.tableForm.tableForm.controls.location.setValue(data.location);
    this.tableForm.tableForm.controls.tableStatus.setValue(data.table_status);

    this.editButton.nativeElement.click();
  }

  saveTable(){
    let data: Table = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      table_number: this.tableForm.tableForm.controls.tableNumber.value as string,
      table_type: this.tableForm.tableForm.controls.tableType.value as string,
      capacity: this.tableForm.tableForm.controls.capacity.value as number,
      location: this.tableForm.tableForm.controls.location.value as string,
      table_status: this.tableForm.tableForm.controls.tableStatus.value as string,
    }

    let table = {
      id: this.tableData.id,
      data: data
    }

    this.saveTableEvent.emit(table);
  }

  deleteTable(){
    this.deleteTableEvent.emit(this.tableData.id);
  }

}
