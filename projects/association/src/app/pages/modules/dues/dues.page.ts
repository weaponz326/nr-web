import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dues',
  templateUrl: './dues.page.html',
  styleUrls: ['./dues.page.scss']
})
export class DuesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Dues", url: "/home/dues/all-dues", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
