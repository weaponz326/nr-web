import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-committees',
  templateUrl: './committees.page.html',
  styleUrls: ['./committees.page.scss']
})
export class CommitteesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Committees", url: "/home/committees/all-committees", icon: "bi bi-list-ul" },
    { text: "New Committee", url: "/home/committees/new-committee", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
