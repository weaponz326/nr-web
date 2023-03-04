import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss']
})
export class ServicesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Services", url: "/home/services/all-services", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
