import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketting',
  templateUrl: './marketting.page.html',
  styleUrls: ['./marketting.page.scss']
})
export class MarkettingPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Campaigns", url: "/home/marketting/all-campaigns", icon: "bi bi-list-ul" },
    { text: "New Campaign", url: "/home/marketting/new-campaign", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/marketting/configuration");
  }

}
