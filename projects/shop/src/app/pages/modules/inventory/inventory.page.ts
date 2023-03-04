import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss']
})
export class InventoryPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Inventory", url: "/home/inventory/all-inventory", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/inventory/configuration");
  }

}
