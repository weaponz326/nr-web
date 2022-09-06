import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component'


@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss']
})
export class MenuItemFormComponent implements OnInit {

  constructor() { }

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) image!: ImageInputComponent;

  menuItemForm = new FormGroup({
    itemCode: new FormControl(''),
    itemName: new FormControl(''),
    price: new FormControl(1.00),
    description: new FormControl('')
  })

  ngOnInit(): void {
  }

}
