import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.page.html',
  styleUrls: ['./procurement.page.scss']
})
export class ProcurementPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Procurement", url: "/home/procurement/all-procurement", icon: "bi bi-list-ul" },
    { text: "New Procurement", url: "/home/procurement/new-procurement", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
