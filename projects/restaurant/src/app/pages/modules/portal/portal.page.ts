import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.page.html',
  styleUrls: ['./portal.page.scss']
})
export class PortalPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "Timeline", url: "/home/portal/timeline", icon: "bi bi-clock" },
    { text: "New Rink", url: "/home/portal/search", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
