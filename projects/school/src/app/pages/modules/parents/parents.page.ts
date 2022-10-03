import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss']
})
export class ParentsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Parents", url: "/home/parents/all-parents", icon: "bi bi-list-ul" },
    { text: "New Parent", url: "/home/parents/new-parent", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
