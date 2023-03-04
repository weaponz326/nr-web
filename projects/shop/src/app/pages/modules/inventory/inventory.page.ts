import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss']
})
export class InventoryPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Inventory", url: "/home/inventory/all-inventory", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
