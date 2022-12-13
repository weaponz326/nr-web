import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss']
})
export class AssetFormComponent implements OnInit {

  constructor() { }

  assetForm = new FormGroup({
    assetNumber: new FormControl(''),
    assetName: new FormControl(''),
    category: new FormControl(''),
    type: new FormControl(''),
    model: new FormControl(''),
    description: new FormControl(''),
    datePurchased: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnInit(): void {
  }

}
