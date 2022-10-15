import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TableFormComponent } from '../table-form/table-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { Table } from 'projects/restaurant/src/app/models/modules/tables/tables.model';


@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveTableEvent = new EventEmitter<any>();

  @ViewChild('tableFormComponentReference', { read: TableFormComponent, static: false }) tableForm!: TableFormComponent;
  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isTableSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
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

    this.saveTableEvent.emit(data);
  }

  resetForm(){
    this.tableForm.tableForm.controls.tableNumber.setValue("");
    this.tableForm.tableForm.controls.tableType.setValue("");
    this.tableForm.tableForm.controls.capacity.setValue(null);
    this.tableForm.tableForm.controls.location.setValue("");
    this.tableForm.tableForm.controls.tableStatus.setValue("");
  }

}
