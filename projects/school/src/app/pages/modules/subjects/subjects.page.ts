import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss']
})
export class SubjectsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Subjects", url: "/home/subjects/all-subjects", icon: "bi bi-list-ul" },
    { text: "Add Subject", url: "/home/subjects/add-subject", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
