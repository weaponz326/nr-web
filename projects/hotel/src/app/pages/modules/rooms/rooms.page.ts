import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss']
})
export class RoomsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Rooms", url: "/home/rooms/all-rooms", icon: "bi bi-list-ul" },
    { text: "New Room", url: "/home/rooms/new-room", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/rooms/configuration");
  }

}
