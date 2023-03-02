import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketting',
  templateUrl: './marketting.page.html',
  styleUrls: ['./marketting.page.scss']
})
export class MarkettingPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Campaigns", url: "/home/marketting/all-campaigns", icon: "bi bi-list-ul" },
    { text: "New Campaign", url: "/home/marketting/new-campaign", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
