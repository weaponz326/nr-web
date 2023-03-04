import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.page.html',
  styleUrls: ['./admissions.page.scss']
})
export class AdmissionsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Admissions", url: "/home/admissions/all-admissions", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/admissions/configuration");
  }
  
}
