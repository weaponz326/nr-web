import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-top',
  templateUrl: './user-top.component.html',
  styleUrls: ['./user-top.component.scss']
})
export class UserTopComponent implements OnInit {

  constructor() { }

  @Input() suiteName: string = "";
  @Input() accountsData: any;
  @Input() isAccountLoading: boolean = false;
  @Input() isAccountChecking: boolean = false;

  @Output() selectAccount = new EventEmitter<number>();

  @ViewChild('modalButtonElementReference', { read: ElementRef, static: false }) modalButton!: ElementRef;

  ngOnInit(): void {
  }

  openSubscriptionModal(){
    this.modalButton.nativeElement.click();
  }

  accountSelected(accountId: any){
    if (!this.isAccountChecking){
      this.selectAccount.emit(accountId);
      console.log(accountId);
    }
  }

}
