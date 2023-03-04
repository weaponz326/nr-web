import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss']
})
export class LedgerPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Ledgers", url: "/home/ledger/all-ledger", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/ledger/configuration");
  }

}
