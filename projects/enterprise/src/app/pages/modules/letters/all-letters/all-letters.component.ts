import { Component, OnInit, ViewChild } from '@angular/core';

import { AddReceivedComponent } from '../add-received/add-received.component';
import { AddSentComponent } from '../add-sent/add-sent.component';
import { EditReceivedComponent } from '../edit-received/edit-received.component';
import { EditSentComponent } from '../edit-sent/edit-sent.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

import { LettersApiService } from 'projects/enterprise/src/app/services/modules-api/letters-api/letters-api.service';


@Component({
  selector: 'app-all-letters',
  templateUrl: './all-letters.component.html',
  styleUrls: ['./all-letters.component.scss']
})
export class AllLettersComponent implements OnInit {

  constructor(
    private lettersApi: LettersApiService,
  ) { }

  @ViewChild('addSentComponentReference', { read: AddSentComponent, static: false }) addSent!: AddSentComponent;
  @ViewChild('editSentComponentReference', { read: EditSentComponent, static: false }) editSent!: EditSentComponent;
  @ViewChild('addReceivedComponentReference', { read: AddReceivedComponent, static: false }) addReceived!: AddReceivedComponent;
  @ViewChild('editReceivedComponentReference', { read: EditReceivedComponent, static: false }) editReceived!: EditReceivedComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) sentDeleteModal!: DeleteModalOneComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) receivedDeleteModal!: DeleteModalTwoComponent;

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

    this.lettersApi.getAccountSentLetters(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.sentGridData = res.results;
          this.currentSentPage = res.current_page;
          this.totalSentPages = res.total_pages;
          this.totalSentItems = res.count;

          this.isFetchingSentGridData = false;
          if(this.totalSentItems == 0)
            this.isSentDataAvailable = false
          else 
            this.isSentDataAvailable = true
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isFetchingSentGridData = false;
          console.log(err);
        }
      })
  }

  sortSentTable(column: any){
    console.log(column);
    this.getAccountSentLetters(1, 20, column);

    this.currentSentSortColumn = column;
  }

  createSent(data: any){
    console.log(data);
    this.addSent.isSaving = true;

    this.lettersApi.postSentLetter(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.addSent.isSaving = false;
          this.addSent.dismissButton.nativeElement.click();
          this.addSent.resetForm();
          this.getAccountSentLetters(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.addSent.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateSent(sent: any){
    console.log(sent);
    this.editSent.isSaving = true;

    this.lettersApi.putSentLetter(sent.data, sent.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editSent.dismissButton.nativeElement.click();
          this.editSent.isSaving = false;
          this.getAccountSentLetters(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.editSent.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteSent(){
    console.log(this.deleteSent);
    this.isSentDeleting = true;

    this.lettersApi.deleteSentLetter(this.deleteSentId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isSentDeleting = false;
          this.getAccountSentLetters(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.isSentDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditSent(data: any){
    console.log(data);
    this.editSent.openModal(data);
  }

  confirmSentDelete(id: any){
    this.deleteSent = id;
    this.sentDeleteModal.openModal();
  }
  
  // received letters

  getAccountReceivedLetters(page: any, size: any, sortField: any){
    this.isFetchingReceivedGridData =  true;

    this.lettersApi.getAccountReceivedLetters(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.receivedGridData = res.results;
          this.currentReceivedPage = res.current_page;
          this.totalReceivedPages = res.total_pages;
          this.totalReceivedItems = res.count;

          this.isFetchingReceivedGridData = false;
          if(this.totalReceivedItems == 0)
            this.isReceivedDataAvailable = false
          else 
            this.isReceivedDataAvailable = true
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isFetchingReceivedGridData = false;
          console.log(err);
        }
      })
  }

  sortReceivedTable(column: any){
    console.log(column);
    this.getAccountReceivedLetters(1, 20, column);

    this.currentReceivedSortColumn = column;
  }

  createReceived(data: any){
    console.log(data);
    this.addReceived.isSaving = true;

    this.lettersApi.postReceivedLetter(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.addReceived.isSaving = false;
          this.addReceived.dismissButton.nativeElement.click();
          this.addReceived.resetForm();
          this.getAccountReceivedLetters(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.addReceived.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateReceived(received: any){
    console.log(received);
    this.editReceived.isSaving = true;

    this.lettersApi.putReceivedLetter(received.data, received.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editReceived.dismissButton.nativeElement.click();
          this.editReceived.isSaving = false;
          this.getAccountReceivedLetters(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.editReceived.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteReceived(){
    console.log(this.deleteReceived);
    this.isReceivedDeleting = true;

    this.lettersApi.deleteReceivedLetter(this.deleteReceivedId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isReceivedDeleting = false;
          this.getAccountReceivedLetters(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.isReceivedDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditReceived(data: any){
    console.log(data);
    this.editReceived.openModal(data);
  }

  confirmReceivedDelete(id: any){
    this.deleteReceived = id;
    this.receivedDeleteModal.openModal();
  }

}
