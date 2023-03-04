import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss']
})
export class DoctorsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Doctors", url: "/home/doctors/all-doctors", icon: "bi bi-list-ul" },
    { text: "New Doctor", url: "/home/doctors/new-doctor", icon: "bi bi-plus-square" }
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/doctors/configuration");
  }

}
