import { Component, OnInit, ViewChild } from '@angular/core';

import { AddReceivedComponent } from '../add-received/add-received.component';
import { AddSentComponent } from '../add-sent/add-sent.component';
import { EditReceivedComponent } from '../edit-received/edit-received.component';
import { EditSentComponent } from '../edit-sent/edit-sent.component';

@Component({
  selector: 'app-all-letters',
  templateUrl: './all-letters.component.html',
  styleUrls: ['./all-letters.component.scss']
})
export class AllLettersComponent implements OnInit {

  constructor() { }

  @ViewChild('addSentComponentReference', { read: AddSentComponent, static: false }) addSent!: AddSentComponent;
  @ViewChild('editSentComponentReference', { read: EditSentComponent, static: false }) editSent!: EditSentComponent;
  @ViewChild('addReceivedComponentReference', { read: AddReceivedComponent, static: false }) addReceived!: AddReceivedComponent;
  @ViewChild('editReceivedComponentReference', { read: EditReceivedComponent, static: false }) editReceived!: EditReceivedComponent;

  navHeading: any[] = [
    { text: "All Accounts", url: "/home/accounts/all-accounts" },
  ];

  sentGridData: any[] = [];
  receivedGridData: any[] = [];

  isFetchingSentGridData: boolean =  false;
  isSentDataAvailable: boolean =  true;

  isFetchingReceivedGridData: boolean =  false;
  isReceivedDataAvailable: boolean =  true;

  isSentDeleting: boolean = false;
  isReceivedDeleting: boolean = false;

  currentSentPage = 0;
  totalSentPages = 0;
  totalSentItems = 0;

  currentReceivedPage = 0;
  totalReceivedPages = 0;
  totalReceivedItems = 0;

  currentSentSortColumn = "";
  currentReceivedSortColumn = "";

  deleteSentId = '';
  deleteReceivedId = '';

  ngOnInit(): void {
    this.getAccountSentLetters(1, 20, "-created_at");
    this.getAccountReceivedLetters(1, 20, "-created_at");
  }

  // sent letters

  getAccountSentLetters(page: any, size: any, sortField: any){
    this.isFetchingSentGridData =  true;


  }

  sortSentTable(column: any){
    console.log(column);
    this.getAccountSentLetters(1, 20, column);

    this.currentSentSortColumn = column;
  }

  createSent(data: any){
    console.log(data);
    this.addSent.isSaving = true;

    
  }

  updateSent(sent: any){
    console.log(sent);
    this.editSent.isSaving = true;

  }

  deleteSent(){
    console.log(this.deleteSent);
    this.isSentDeleting = true;


  }

  openEditSent(data: any){
    console.log(data);
    this.editSent.openModal(data);
  }

  confirmSentDelete(id: any){
    this.deleteSent = id;
    // this.deleteModal.openModal();
  }
  
  // received letters

  getAccountReceivedLetters(page: any, size: any, sortField: any){
    this.isFetchingSentGridData =  true;


  }

  sortReceivedTable(column: any){
    console.log(column);
    this.getAccountReceivedLetters(1, 20, column);

    this.currentReceivedSortColumn = column;
  }

  createReceived(data: any){
    console.log(data);
    this.addReceived.isSaving = true;

    
  }

  updateReceived(received: any){
    console.log(received);
    this.editReceived.isSaving = true;

  }

  deleteReceived(){
    console.log(this.deleteReceived);
    this.isReceivedDeleting = true;


  }

  openEditReceived(data: any){
    console.log(data);
    this.editReceived.openModal(data);
  }

  confirmReceivedDelete(id: any){
    this.deleteReceived = id;
    // this.deleteModal.openModal();
  }

}
