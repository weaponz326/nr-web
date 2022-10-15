import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss']
})
export class SectionsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Sections", url: "/home/sections/all-sections", icon: "bi bi-list-ul" },
    { text: "New Section", url: "/home/sections/new-section", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
