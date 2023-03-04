import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss']
})
export class BillsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Bills", url: "/home/bills/all-bills", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/bills/configuration");
  }

}
