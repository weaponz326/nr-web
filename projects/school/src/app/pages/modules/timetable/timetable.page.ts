import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss']
})
export class TimetablePage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Timetables", url: "/home/timetable/all-timetable", icon: "bi bi-list-ul" },
    { text: "New Timetable", url: "/home/timetable/new-timetable", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/timetable/configuration");
  }

}
