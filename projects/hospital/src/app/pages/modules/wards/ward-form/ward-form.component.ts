import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ward-form',
  templateUrl: './ward-form.component.html',
  styleUrls: ['./ward-form.component.scss']
})
export class WardFormComponent implements OnInit {

  constructor() { }

  wardForm = new FormGroup({
    wardNumber: new FormControl(''),
    wardName: new FormControl(''),
    wardType: new FormControl(''),
    location: new FormControl(''),
    capacity: new FormControl(),
  })

  ngOnInit(): void {
  }

}
