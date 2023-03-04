import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchasing',
  templateUrl: './purchasing.page.html',
  styleUrls: ['./purchasing.page.scss']
})
export class PurchasingPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Purchasing", url: "/home/purchasing/all-purchasing", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/purchasing/configuration");
  }

}
