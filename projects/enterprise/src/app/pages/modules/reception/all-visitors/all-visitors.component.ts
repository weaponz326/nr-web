import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { AddVisitorComponent } from '../add-visitor/add-visitor.component'
import { EditVisitorComponent } from '../edit-visitor/edit-visitor.component'

import { ReceptionApiService } from 'projects/enterprise/src/app/services/modules-api/reception-api/reception-api.service';


@Component({
  selector: 'app-all-visitors',
  templateUrl: './all-visitors.component.html',
  styleUrls: ['./all-visitors.component.scss']
})
export class AllVisitorsComponent implements OnInit {

  constructor(
    private router: Router,
    private receptionApi: ReceptionApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('addVisitorComponentReference', { read: AddVisitorComponent, static: false }) addVisitor!: AddVisitorComponent;
  @ViewChild('editVisitorComponentReference', { read: EditVisitorComponent, static: false }) editVisitor!: EditVisitorComponent;

  navHeading: any[] = [
    { text: "All Visitors", url: "/home/reception/all-visitors" },
  ];

  visitorsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalVisitors = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountVisitor(1, 20, "-created_at");
  }

  getAccountVisitor(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.receptionApi.getAccountVisitor(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.visitorsGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalVisitors = res.count;

          this.isFetchingGridData = false;
          if(this.totalVisitors == 0)
            this.isDataAvailable = false
          else 
            this.isDataAvailable = true
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
    this.getAccountVisitor(1, 20, column);

    this.currentSortColumn = column;
  }

  postVisitor(data: any){
    console.log(data);
    this.addVisitor.isVisitorSaving = true;

    this.receptionApi.postVisitor(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getAccountVisitor(1, 20, '-created_at');
            this.addVisitor.isVisitorSaving = false;
            this.addVisitor.addButton.nativeElement.click();
            this.isDataAvailable = false;

            this.addVisitor.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addVisitor.isVisitorSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putVisitor(visitor: any){
    console.log(visitor);
    this.editVisitor.isVisitorSaving = true;

    this.receptionApi.putVisitor(visitor.id, visitor.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editVisitor.isVisitorSaving = false;
          this.editVisitor.editButton.nativeElement.click();
          this.getAccountVisitor(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.addVisitor.isVisitorSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteVisitor(){
    this.editVisitor.isVisitorDeleting = true;

    this.receptionApi.deleteVisitor(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editVisitor.isVisitorDeleting = false;
          this.getAccountVisitor(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.editVisitor.isVisitorDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditVisitor(data: any){
    console.log(data);
    this.editVisitor.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.kitchenStockPrint.printAllVisitors();
  }

}
