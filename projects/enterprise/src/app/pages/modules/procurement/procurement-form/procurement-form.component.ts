import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-procurement-form',
  templateUrl: './procurement-form.component.html',
  styleUrls: ['./procurement-form.component.scss']
})
export class ProcurementFormComponent implements OnInit {

  constructor() { }

  procurementForm = new FormGroup({
    procurementCode: new FormControl(''),
    orderCode: new FormControl(''),
    orderType: new FormControl(''),
    orderDate: new FormControl(),
    description: new FormControl(''),
    project: new FormControl(''),
    procurementStatus: new FormControl(''),
    vendor: new FormControl(''),
    vendorPhone: new FormControl(''),
    vendorEmail: new FormControl(''),
    vendorAddress: new FormControl(''),
  });
  
  ngOnInit(): void {
  }

}
