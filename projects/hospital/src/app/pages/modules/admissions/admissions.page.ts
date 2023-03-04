import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.page.html',
  styleUrls: ['./admissions.page.scss']
})
export class AdmissionsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Admissions", url: "/home/admissions/all-admissions", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
