import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss']
})
export class RosterPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Rosters", url: "/home/roster/all-rosters", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
