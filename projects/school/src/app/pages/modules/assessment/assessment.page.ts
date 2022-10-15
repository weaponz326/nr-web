import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.page.html',
  styleUrls: ['./assessment.page.scss']
})
export class AssessmentPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Assessment", url: "/home/assessment/all-assessment", icon: "bi bi-list-ul" },
    { text: "New Assessment", url: "/home/assessment/new-assessment", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
