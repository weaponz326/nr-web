import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss']
})
export class MembersPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Members", url: "/home/members/all-members", icon: "bi bi-list-ul" },
    { text: "Add Member", url: "/home/members/add-member", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
