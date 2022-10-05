import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';


@Component({
  selector: 'app-kitchen-stock',
  templateUrl: './kitchen-stock.page.html',
  styleUrls: ['./kitchen-stock.page.scss']
})
export class KitchenStockPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Items", url: "/home/kitchen-stock/all-stock-items", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;

  checkConfigAccess(){
    let accessLevel = JSON.parse(localStorage.getItem('restaurantUserLevel') as string).access_level;

    if (accessLevel != "Staff"){
      console.log("Access granted :)");
      this.router.navigateByUrl('/home/kitchen-stock/configuration');
    }
    else{
      console.log("Access denied :(");
      this.accessToast.openToast();
    }
  }

}
