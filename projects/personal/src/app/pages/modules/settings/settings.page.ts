import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "Profile", url: "/home/settings/profile", icon: "bi bi-person" },
    { text: "All Accounts", url: "/home/settings/all-accounts", icon: "bi bi-list-ul" },
    // { text: "Invitations", url: "/home/settings/invitations", icon: "bi bi-envelope" },
  ]

  ngOnInit(): void {
  }

}
