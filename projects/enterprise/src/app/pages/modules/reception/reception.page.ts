import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  styleUrls: ['./reception.page.scss']
})
export class ReceptionPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Visitors", url: "/home/reception/all-visitors", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/reception/configuration");
  }

}
