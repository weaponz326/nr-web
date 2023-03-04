import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss']
})
export class ReservationsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Reservations", url: "/home/reservations/all-reservations", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/reservations/configuration");
  }

}
