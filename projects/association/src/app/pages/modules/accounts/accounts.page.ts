import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss']
})
export class AccountsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Accounts", url: "/home/accounts/all-accounts", icon: "bi bi-list-ul" },
    { text: "All Transactions", url: "/home/accounts/all-transactions", icon: "bi bi-list-ul" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/association/configuration");
  }

}
