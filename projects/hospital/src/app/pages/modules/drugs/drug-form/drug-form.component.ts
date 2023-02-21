import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
  styleUrls: ['./drug-form.component.scss']
})
export class DrugFormComponent implements OnInit {

  constructor() { }

  drugForm = new FormGroup({
    ndcNumber: new FormControl(''),
    drugName: new FormControl(''),
    genericName: new FormControl(''),
    manufacturer: new FormControl(''),
    drugType: new FormControl(''),
    unitDose: new FormControl(''),
    drugCategory: new FormControl(''),
    unitPrice: new FormControl(),
    batchNumber: new FormControl(''),
    purchasedDate: new FormControl(),
    initialQuantity: new FormControl(),
    dispensedQuantity: new FormControl(),
    remainingQuantity: new FormControl(),
    manufacturingDate: new FormControl(),
    expiryDate: new FormControl(),
    storageLocation: new FormControl(''),
    storageBin: new FormControl(''),
    refillOrdered: new FormControl(),
  })

  ngOnInit(): void {
  }

}
