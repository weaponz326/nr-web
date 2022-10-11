import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss']
})
export class TermsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Terms", url: "/home/terms/all-terms", icon: "bi bi-list-ul" },
    { text: "New Term", url: "/home/terms/new-term", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
