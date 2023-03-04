import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss']
})
export class StaffPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Staff", url: "/home/staff/all-staff", icon: "bi bi-list-ul" },
    { text: "New Staff", url: "/home/staff/new-staff", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/staff/configuration");
  }

}
