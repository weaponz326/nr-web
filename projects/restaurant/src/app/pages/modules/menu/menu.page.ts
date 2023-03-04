import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Menu Groups", url: "/home/menu/all-menu-groups", icon: "bi bi-list-ul" },
    { text: "All Menu Items", url: "/home/menu/all-menu-items", icon: "bi bi-list-ul" }
  ]
  
  ngOnInit(): void {
  }

}
