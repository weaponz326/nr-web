import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss']
})
export class RoomsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Rooms", url: "/home/rooms/all-rooms", icon: "bi bi-list-ul" },
    { text: "New Room", url: "/home/rooms/new-room", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
