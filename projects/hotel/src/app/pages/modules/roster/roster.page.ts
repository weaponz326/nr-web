import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss']
})
export class RosterPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Roster", url: "/home/roster/all-roster", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/roster/configuration");
  }

}
