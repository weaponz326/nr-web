import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss']
})
export class PatientsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Patients", url: "/home/patients/all-patients", icon: "bi bi-list-ul" },
    { text: "New Patient", url: "/home/patients/new-patient", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/patients/configuration");
  }
  
}
