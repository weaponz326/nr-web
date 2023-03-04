import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.page.html',
  styleUrls: ['./laboratory.page.scss']
})
export class LaboratoryPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Laboaratory", url: "/home/laboratory/all-labs", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/laboratory/configuration");
  }

}
