import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.page.html',
  styleUrls: ['./appraisal.page.scss']
})
export class AppraisalPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Appraisal", url: "/home/appraisal/all-appraisal", icon: "bi bi-list-ul" },
    { text: "New Appraisal", url: "/home/appraisal/new-appraisal", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
