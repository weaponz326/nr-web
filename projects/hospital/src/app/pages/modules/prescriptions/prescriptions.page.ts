import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss']
})
export class PrescriptionsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Prescriptions", url: "/home/prescriptions/all-prescriptions", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
