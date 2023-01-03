import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Bookings", url: "/home/bookings/all-bookings", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
