import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.page.html',
  styleUrls: ['./leave.page.scss']
})
export class LeavePage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Leave", url: "/home/leave/all-leave", icon: "bi bi-list-ul" },
    { text: "Add Leave", url: "/home/leave/add-leave", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
