import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.page.html',
  styleUrls: ['./laboratory.page.scss']
})
export class LaboratoryPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Laboaratory", url: "/home/laboratory/all-labs", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
