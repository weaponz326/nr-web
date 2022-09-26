import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Users", url: "/home/admin/all-users", icon: "bi bi-people" },
    { text: "New Invitation", url: "/home/admin/search", icon: "bi bi-plus-square" },
    { text: "Invitations", url: "/home/admin/invitations", icon: "bi bi-envelope" },
  ]
  
  ngOnInit(): void {
  }

}
