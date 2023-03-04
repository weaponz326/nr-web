import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss']
})
export class TablesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Tables", url: "/home/tables/all-tables", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
