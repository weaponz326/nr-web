import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.page.html',
  styleUrls: ['./diagnosis.page.scss']
})
export class DiagnosisPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Diagnosis", url: "/home/diagnosis/all-diagnosis", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
