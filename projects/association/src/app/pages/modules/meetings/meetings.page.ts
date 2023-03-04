import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.page.html',
  styleUrls: ['./meetings.page.scss']
})
export class MeetingsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Meetings", url: "/home/meetings/all-meetings", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/meetings/configuration");
  }

}
