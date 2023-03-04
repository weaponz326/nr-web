import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss']
})
export class RosterPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Roster", url: "/home/roster/all-roster", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
