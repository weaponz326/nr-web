import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss']
})
export class StaffPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Staff", url: "/home/staff/all-staff", icon: "bi bi-list-ul" },
    { text: "New Staff", url: "/home/staff/new-staff", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
