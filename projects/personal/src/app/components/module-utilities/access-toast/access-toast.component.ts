import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-access-toast',
  templateUrl: './access-toast.component.html',
  styleUrls: ['./access-toast.component.scss']
})
export class AccessToastComponent implements OnInit {

  constructor() { }

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  isShowToast = false;
  timer: any;

  ngOnInit(): void {
  }

  openToast(){
    console.log("opening module access toast");
    this.isShowToast = true;

    this.timer = setInterval(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast(): void{
    this.isShowToast = false;
    clearInterval(this.timer);
    console.log("closing toast...");
  };

}
