import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-committees',
  templateUrl: './committees.page.html',
  styleUrls: ['./committees.page.scss']
})
export class CommitteesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Committees", url: "/home/committees/all-committees", icon: "bi bi-list-ul" },
    { text: "New Committee", url: "/home/committees/new-committee", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/committees/configuration");
  }

}
