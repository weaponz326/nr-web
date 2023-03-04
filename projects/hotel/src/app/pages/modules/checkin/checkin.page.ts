import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss']
})
export class CheckinPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Check-In", url: "/home/checkin/all-checkin", icon: "bi bi-list-ul" },
    { text: "New Check-In", url: "/home/checkin/new-checkin", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/checkin/configuration");
  }

}
