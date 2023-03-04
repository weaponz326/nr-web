import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss']
})
export class ParentsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Parents", url: "/home/parents/all-parents", icon: "bi bi-list-ul" },
    { text: "New Parent", url: "/home/parents/new-parent", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/parents/configuration");
  }
  
}
