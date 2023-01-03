import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss']
})
export class CheckinPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Check-In", url: "/home/checkin/all-checkin", icon: "bi bi-list-ul" },
    { text: "New Check-In", url: "/home/checkin/new-checkin", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
