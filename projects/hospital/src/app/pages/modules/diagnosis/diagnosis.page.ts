import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.page.html',
  styleUrls: ['./diagnosis.page.scss']
})
export class DiagnosisPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Diagnosis", url: "/home/diagnosis/all-diagnosis", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/diagnosis/configuration");
  }

}
