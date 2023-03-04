import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-executives',
  templateUrl: './executives.page.html',
  styleUrls: ['./executives.page.scss']
})
export class ExecutivesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Executives", url: "/home/executives/all-executives", icon: "bi bi-list-ul" },
    { text: "Add Executive", url: "/home/executives/add-executive", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/exucutives/configuration");
  }

}
