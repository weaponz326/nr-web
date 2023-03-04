import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.page.html',
  styleUrls: ['./letters.page.scss']
})
export class LettersPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Letters", url: "/home/letters/all-letters", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/letters/configuration");
  }

}
