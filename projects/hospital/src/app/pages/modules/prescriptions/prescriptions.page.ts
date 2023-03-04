import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss']
})
export class PrescriptionsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Prescriptions", url: "/home/prescriptions/all-prescriptions", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/prescriptions/configuration");
  }

}
