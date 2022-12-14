import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  constructor() { }

  orderReviewForm = new FormGroup({
    procurementCode: new FormControl(''),
    
    issuedDate: new FormControl(),
    issuedBy: new FormControl(''),
    receivedDate: new FormControl(),
    receivedBy: new FormControl(''),
    approvedDate: new FormControl(),
    approvedBy: new FormControl(''),
    acknowledgedDate: new FormControl(),
    acknowledgedBy: new FormControl(''),
    completedDate: new FormControl(),
    completedBy: new FormControl(''),

  });

  ngOnInit(): void {
  }

}
