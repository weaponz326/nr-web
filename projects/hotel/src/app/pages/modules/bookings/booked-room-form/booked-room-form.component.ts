import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-booked-room-form',
  templateUrl: './booked-room-form.component.html',
  styleUrls: ['./booked-room-form.component.scss']
})
export class BookedRoomFormComponent implements OnInit {

  constructor() { }

  selectedRoomId = "";
  selectedRoomData: any;

  bookedRoomForm = new FormGroup({
    roomNumber: new FormControl({value: "", disabled: true}),
    roomType: new FormControl({value: "", disabled: true}),
    rate: new FormControl({value: 0.00, disabled: true}),
    personsNumber: new FormControl(1)
  })

  ngOnInit(): void {
  }  

}
