import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss']
})
export class PaymentsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Payments", url: "/home/payments/all-payments", icon: "bi bi-list-ul" },
    { text: "New Payment", url: "/home/payments/new-payment", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;

  checkConfigAccess(){
    let accessLevel = JSON.parse(localStorage.getItem('restaurantUserLevel') as string).access_level;

    if (accessLevel != "Staff"){
      console.log("Access granted :)");
      this.router.navigateByUrl('/home/payments/configuration');
    }
    else{
      console.log("Access denied :(");
      this.accessToast.openToast();
    }
  }

}
