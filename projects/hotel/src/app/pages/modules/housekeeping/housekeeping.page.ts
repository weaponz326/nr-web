import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-housekeeping',
  templateUrl: './housekeeping.page.html',
  styleUrls: ['./housekeeping.page.scss']
})
export class HousekeepingPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All House Keeping", url: "/home/housekeeping/all-housekeeping", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
