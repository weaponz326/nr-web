import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor() { }

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) productImage!: ImageInputComponent;

  productForm = new FormGroup({
    productCode: new FormControl(''),
    productName: new FormControl(''),
    description: new FormControl(''),
    productCategory: new FormControl(''),
    price: new FormControl(0.00),
  });

  ngOnInit(): void {
  }

}
