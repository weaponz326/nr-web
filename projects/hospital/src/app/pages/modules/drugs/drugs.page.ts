import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.page.html',
  styleUrls: ['./drugs.page.scss']
})
export class DrugsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Drugs", url: "/home/drugs/all-drugs", icon: "bi bi-list-ul" },
    { text: "New Drug", url: "/home/drugs/new-drug", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
