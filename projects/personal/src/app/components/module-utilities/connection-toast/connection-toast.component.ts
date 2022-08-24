import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-connection-toast',
  templateUrl: './connection-toast.component.html',
  styleUrls: ['./connection-toast.component.scss']
})
export class ConnectionToastComponent implements OnInit {

  constructor() { }

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  isShowToast = false;
  timer: any;

  ngOnInit(): void {
  }

  openToast(){
    console.log("opening connection toast");
    this.isShowToast = true;

    var timer = setInterval(() => {
      this.isShowToast = false;
      clearInterval(timer);
      console.log("closing toast...", timer);
    }, 3000);
  }

}
