import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.page.html',
  styleUrls: ['./receivables.page.scss']
})
export class ReceivablesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Receivables", url: "/home/receivables/all-receivables", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
