import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss']
})
export class ReservationsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Reservations", url: "/home/reservations/all-reservations", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
