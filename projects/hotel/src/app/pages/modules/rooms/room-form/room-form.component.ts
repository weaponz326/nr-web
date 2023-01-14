import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {

  constructor() { }

  roomForm = new FormGroup({
    roomNumber: new FormControl(''),
    roomType: new FormControl(''),
    location: new FormControl(''),
    rate: new FormControl(''),
    features: new FormControl(''),
    roomStatus: new FormControl(''),
  })
  
  ngOnInit(): void {
  }

}
