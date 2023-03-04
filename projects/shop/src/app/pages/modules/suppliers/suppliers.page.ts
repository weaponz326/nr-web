import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss']
})
export class SuppliersPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Suppliers", url: "/home/suppliers/all-suppliers", icon: "bi bi-list-ul" },
    { text: "New Supplier", url: "/home/suppliers/new-supplier", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/suppliers/configuration");
  }

}
