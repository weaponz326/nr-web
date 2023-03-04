import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss']
})
export class AppointmentsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Appointments", url: "/home/appointments/all-appointments", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
