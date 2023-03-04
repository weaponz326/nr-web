import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss']
})
export class ServicesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Services", url: "/home/services/all-services", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/services/configuration");
  }

}
