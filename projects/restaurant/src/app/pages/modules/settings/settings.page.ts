import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "Profile", url: "/home/settings/profile", icon: "bi bi-building" },
    { text: "Subscription", url: "/home/settings/billing", icon: "bi bi-cash" },
  ]
  
  ngOnInit(): void {
  }

}
