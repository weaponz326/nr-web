import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss']
})
export class NotesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "Note Board", url: "/home/notes/note-board", icon: "bi bi-clipboard" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/notes/configuration");
  }
  
}
