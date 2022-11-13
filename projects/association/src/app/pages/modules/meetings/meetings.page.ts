import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.page.html',
  styleUrls: ['./meetings.page.scss']
})
export class MeetingsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Meetings", url: "/home/meetings/all-meetings", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
