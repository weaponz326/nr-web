import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss']
})
export class SalesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Sales", url: "/home/sales/all-sales", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/sales/configuration");
  }

}
