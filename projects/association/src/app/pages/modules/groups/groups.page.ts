import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss']
})
export class GroupsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Groups", url: "/home/groups/all-groups", icon: "bi bi-list-ul" },
    { text: "New Group", url: "/home/groups/new-group", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/groups/configuration");
  }

}
