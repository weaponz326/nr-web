import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss']
})
export class InvoicePage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Invoice", url: "/home/invoice/all-invoice", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/invoice/configuration");
  }

}
