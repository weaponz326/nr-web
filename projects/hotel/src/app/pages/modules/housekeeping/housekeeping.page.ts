import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-housekeeping',
  templateUrl: './housekeeping.page.html',
  styleUrls: ['./housekeeping.page.scss']
})
export class HousekeepingPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All House Keeping", url: "/home/housekeeping/all-housekeeping", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/housekeeping/configuration");
  }

}
