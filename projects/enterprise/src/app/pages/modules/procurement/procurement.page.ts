import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.page.html',
  styleUrls: ['./procurement.page.scss']
})
export class ProcurementPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Procurement", url: "/home/procurement/all-procurement", icon: "bi bi-list-ul" },
    { text: "New Procurement", url: "/home/procurement/new-procurement", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/procurement/configuration");
  }

}
