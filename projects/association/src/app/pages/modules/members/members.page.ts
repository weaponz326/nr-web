import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss']
})
export class MembersPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Members", url: "/home/members/all-members", icon: "bi bi-list-ul" },
    { text: "New Member", url: "/home/members/new-member", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/accounts/configuration");
  }

}
