import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss']
})
export class AssetsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Assets", url: "/home/assets/all-assets", icon: "bi bi-list-ul" },
    { text: "New Asset", url: "/home/assets/new-asset", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
