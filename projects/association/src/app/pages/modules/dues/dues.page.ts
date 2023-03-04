import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dues',
  templateUrl: './dues.page.html',
  styleUrls: ['./dues.page.scss']
})
export class DuesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Dues", url: "/home/dues/all-dues", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/dues/configuration");
  }

}
