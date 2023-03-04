import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss']
})
export class SectionsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Sections", url: "/home/sections/all-sections", icon: "bi bi-list-ul" },
    { text: "New Section", url: "/home/sections/new-section", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/sections/configuration");
  }
  
}
