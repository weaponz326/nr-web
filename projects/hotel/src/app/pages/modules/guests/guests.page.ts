import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.page.html',
  styleUrls: ['./guests.page.scss']
})
export class GuestsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Guests", url: "/home/guests/all-guests", icon: "bi bi-list-ul" },
    { text: "New Guest", url: "/home/guests/new-guest", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/guests/configuration");
  }

}
