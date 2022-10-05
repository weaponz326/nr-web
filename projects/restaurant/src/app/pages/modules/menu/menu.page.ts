import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Menu Groups", url: "/home/menu/all-menu-groups", icon: "bi bi-list-ul" },
    { text: "All Menu Items", url: "/home/menu/all-menu-items", icon: "bi bi-list-ul" }
  ]
  
  ngOnInit(): void {
  }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;

  checkConfigAccess(){
    let accessLevel = JSON.parse(localStorage.getItem('restaurantUserLevel') as string).access_level;

    if (accessLevel != "Staff"){
      console.log("Access granted :)");
      this.router.navigateByUrl('/home/menu/configuration');
    }
    else{
      console.log("Access denied :(");
      this.accessToast.openToast();
    }
  }

}
