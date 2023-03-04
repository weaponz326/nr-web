import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss']
})
export class AssetsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Assets", url: "/home/assets/all-assets", icon: "bi bi-list-ul" },
    { text: "New Asset", url: "/home/assets/new-asset", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/assets/configuration");
  }

}
