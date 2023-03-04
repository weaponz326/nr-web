import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss']
})
export class AppointmentsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Appointments", url: "/home/appointments/all-appointments", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/appointments/configuration");
  }

}
