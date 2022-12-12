import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss']
})
export class FilesPage implements OnInit {

  constructor() { }
  
  navLinks: any[] = [
    { text: "All Folders", url: "/home/files/all-folders", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
