import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.page.html',
  styleUrls: ['./letters.page.scss']
})
export class LettersPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Letters", url: "/home/letters/all-letters", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
