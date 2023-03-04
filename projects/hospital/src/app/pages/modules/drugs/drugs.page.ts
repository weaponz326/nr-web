import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.page.html',
  styleUrls: ['./drugs.page.scss']
})
export class DrugsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Drugs", url: "/home/drugs/all-drugs", icon: "bi bi-list-ul" },
    { text: "New Drug", url: "/home/drugs/new-drug", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/drugs/configuration");
  }

}
