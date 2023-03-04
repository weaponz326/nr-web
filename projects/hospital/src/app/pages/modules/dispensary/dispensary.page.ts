import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispensary',
  templateUrl: './dispensary.page.html',
  styleUrls: ['./dispensary.page.scss']
})
export class DispensaryPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Dispenses", url: "/home/dispensary/all-dispenses", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
