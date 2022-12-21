import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.page.html',
  styleUrls: ['./fees.page.scss']
})
export class FeesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Fees", url: "/home/fees/all-fees", icon: "bi bi-list-ul" },
    { text: "Create Fees", url: "/home/fees/create-fees", icon: "bi bi-plus-square" },
    { text: "Bills", url: "/home/fees/class-bills", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
