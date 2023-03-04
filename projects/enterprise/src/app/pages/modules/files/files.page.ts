import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss']
})
export class FilesPage implements OnInit {

  constructor(private router: Router) { }
  
  navLinks: any[] = [
    { text: "All Folders", url: "/home/files/all-folders", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/files/configuration");
  }

}
