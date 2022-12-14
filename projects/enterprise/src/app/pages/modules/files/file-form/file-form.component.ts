import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {

  constructor() { }

  fileForm = new FormGroup({
    fileNumber: new FormControl(''),
    fileName: new FormControl(''),
    fileType: new FormControl(''),
    dateAdded: new FormControl()
  })

  ngOnInit(): void {
  }

}
