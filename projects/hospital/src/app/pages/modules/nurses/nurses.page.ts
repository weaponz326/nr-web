import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.page.html',
  styleUrls: ['./nurses.page.scss']
})
export class NursesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Nurses", url: "/home/nurses/all-nurses", icon: "bi bi-list-ul" },
    { text: "New Nurse", url: "/home/nurses/new-nurse", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/nurses/configuration");
  }

}
