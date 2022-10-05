import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';


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

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;

  checkConfigAccess(){
    let accessLevel = JSON.parse(localStorage.getItem('restaurantUserLevel') as string).access_level;

    if (accessLevel != "Staff"){
      console.log("Access granted :)");
      this.router.navigateByUrl('/home/staff/configuration');
    }
    else{
      console.log("Access denied :(");
      this.accessToast.openToast();
    }
  }

}
