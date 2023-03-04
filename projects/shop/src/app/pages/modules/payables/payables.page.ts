import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payables',
  templateUrl: './payables.page.html',
  styleUrls: ['./payables.page.scss']
})
export class PayablesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Payables", url: "/home/payables/all-payables", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/payables/configuration");
  }

}
