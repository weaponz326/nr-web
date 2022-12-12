import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  styleUrls: ['./reception.page.scss']
})
export class ReceptionPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Visitors", url: "/home/reception/all-visitors", icon: "bi bi-list-ul" },
    { text: "Add Visitor", url: "/home/reception/add-visitor", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
