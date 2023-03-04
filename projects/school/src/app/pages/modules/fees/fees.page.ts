import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.page.html',
  styleUrls: ['./fees.page.scss']
})
export class FeesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Fees", url: "/home/fees/all-fees", icon: "bi bi-list-ul" },
    { text: "Create Fees", url: "/home/fees/create-fees", icon: "bi bi-plus-square" },
    { text: "Bills", url: "/home/fees/class-bills", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/fees/configuration");
  }

}
