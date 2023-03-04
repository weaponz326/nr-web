import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.page.html',
  styleUrls: ['./receivables.page.scss']
})
export class ReceivablesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Receivables", url: "/home/receivables/all-receivables", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/receivables/configuration");
  }

}
