import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-delete-modal-one',
  templateUrl: './delete-modal-one.component.html',
  styleUrls: ['./delete-modal-one.component.scss']
})
export class DeleteModalOneComponent implements OnInit {

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
