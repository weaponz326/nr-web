import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wards',
  templateUrl: './wards.page.html',
  styleUrls: ['./wards.page.scss']
})
export class WardsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Wards", url: "/home/wards/all-wards", icon: "bi bi-list-ul" },
    { text: "New Ward", url: "/home/wards/new-ward", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/wards/configuration");
  }

}
