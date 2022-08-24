import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  constructor() { }

  @Output() updateUserEvent = new EventEmitter<any>;

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) imageInput!: ImageInputComponent;

  isUserLoading = false;
  isUserSaving = false;

  ngOnInit(): void {
  }

  updatePhoto(){
    let data = {
      photo: this.imageInput.image
    }

    this.updateUserEvent.emit(data);
  }

}
