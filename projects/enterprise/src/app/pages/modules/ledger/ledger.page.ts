import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss']
})
export class LedgerPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Ledger", url: "/home/ledger/all-ledger", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
