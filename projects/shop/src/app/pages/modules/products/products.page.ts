import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Products", url: "/home/products/all-products", icon: "bi bi-list-ul" },
    { text: "New Product", url: "/home/products/new-product", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
