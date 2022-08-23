import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss']
})
export class NotesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "Note Board", url: "/home/notes/note-board", icon: "bi bi-clipboard" },
  ]

  ngOnInit(): void {
  }

}
