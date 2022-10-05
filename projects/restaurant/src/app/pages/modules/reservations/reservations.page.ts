import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss']
})
export class ReservationsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Reservations", url: "/home/reservations/all-reservations", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;

  checkConfigAccess(){
    let accessLevel = JSON.parse(localStorage.getItem('restaurantUserLevel') as string).access_level;

    if (accessLevel != "Staff"){
      console.log("Access granted :)");
      this.router.navigateByUrl('/home/reservations/configuration');
    }
    else{
      console.log("Access denied :(");
      this.accessToast.openToast();
    }
  }

}
