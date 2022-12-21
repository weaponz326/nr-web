import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor() { }

  @Output() updateAccountEvent = new EventEmitter<any>;

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) imageInput!: ImageInputComponent;

  isAccountLoading = true;
  isAccountSaving = false;

  ngOnInit(): void {
  }

  updateLogo(){
    let data = {
      logo: this.imageInput.image
    }

    this.updateAccountEvent.emit(data);
  }

}
