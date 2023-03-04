import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss']
})
export class TablesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Tables", url: "/home/tables/all-tables", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/tables/configuration");
  }

}
