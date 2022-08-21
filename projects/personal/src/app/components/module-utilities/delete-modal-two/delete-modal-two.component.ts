import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-delete-modal-two',
  templateUrl: './delete-modal-two.component.html',
  styleUrls: ['./delete-modal-two.component.scss']
})
export class DeleteModalTwoComponent implements OnInit {

  constructor() { }

  @Output() confirmEvent = new EventEmitter<any>();

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  ngOnInit(): void {
  }

  openModal(){
    this.buttonElement.nativeElement.click();
  }

  onConfirm() {
    console.log("Yep... lets go ahead and delete this useless piece of ****");
    this.confirmEvent.emit("OK");
  }

}
