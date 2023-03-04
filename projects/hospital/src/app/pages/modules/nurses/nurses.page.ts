import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.page.html',
  styleUrls: ['./nurses.page.scss']
})
export class NursesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Nurses", url: "/home/nurses/all-nurses", icon: "bi bi-list-ul" },
    { text: "New Nurse", url: "/home/nurses/new-nurse", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
