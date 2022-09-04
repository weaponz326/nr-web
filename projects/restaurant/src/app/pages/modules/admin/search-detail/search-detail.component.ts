import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {

  constructor() { }

  @Input() searchDetail: any;
  @Output() sendInvitationEvent = new EventEmitter<string>();

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  isSending = false;

  ngOnInit(): void {
  }

  sendInvitation(){
    this.sendInvitationEvent.emit();
  }

  openModal(){
    this.buttonElement.nativeElement.click();
  }

}
