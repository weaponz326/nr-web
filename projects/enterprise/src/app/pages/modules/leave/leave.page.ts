import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.page.html',
  styleUrls: ['./leave.page.scss']
})
export class LeavePage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Leave", url: "/home/leave/all-leave", icon: "bi bi-list-ul" },
    { text: "Add Leave", url: "/home/leave/add-leave", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/leave/configuration");
  }

}
