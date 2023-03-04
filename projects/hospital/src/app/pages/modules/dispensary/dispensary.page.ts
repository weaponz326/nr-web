import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dispensary',
  templateUrl: './dispensary.page.html',
  styleUrls: ['./dispensary.page.scss']
})
export class DispensaryPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Dispenses", url: "/home/dispensary/all-dispenses", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/dispensary/configuration");
  }

}
