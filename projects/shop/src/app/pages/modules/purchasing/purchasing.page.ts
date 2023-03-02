import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchasing',
  templateUrl: './purchasing.page.html',
  styleUrls: ['./purchasing.page.scss']
})
export class PurchasingPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Purchasing", url: "/home/purchasing/all-purchasing", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
