import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { ProcurementApiService } from 'projects/enterprise/src/app/services/modules-api/procurement-api/procurement-api.service';
import { OrderReview } from 'projects/enterprise/src/app/models/modules/procurement/procurement.model';


@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  constructor(
    private procurementApi: ProcurementApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  orderReviewData: any;

  orderReviewForm = new FormGroup({    
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
    this.getOrderReview();
  }

  getOrderReview(){
    this.procurementApi.getOrderReview()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.orderReviewData = res;

          this.orderReviewForm.controls.issuedBy.setValue(this.orderReviewData.issued_by);
          this.orderReviewForm.controls.issuedDate.setValue(this.orderReviewData.issued_date);
          this.orderReviewForm.controls.receivedBy.setValue(this.orderReviewData.received_by);
          this.orderReviewForm.controls.receivedDate.setValue(this.orderReviewData.received_date);
          this.orderReviewForm.controls.approvedBy.setValue(this.orderReviewData.approved_by);
          this.orderReviewForm.controls.approvedDate.setValue(this.orderReviewData.approved_date);
          this.orderReviewForm.controls.acknowledgedBy.setValue(this.orderReviewData.acknowledged_by);
          this.orderReviewForm.controls.acknowledgedDate.setValue(this.orderReviewData.acknowledged_date);
          this.orderReviewForm.controls.completedBy.setValue(this.orderReviewData.completed_by);
          this.orderReviewForm.controls.completedDate.setValue(this.orderReviewData.completed_date);

        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })    
  }

  updateOrderReview(){
    console.log('u are saving a new procurement');

    var data: OrderReview = {
      issued_by: this.orderReviewForm.controls.issuedBy.value as string,
      issued_date: this.orderReviewForm.controls.issuedDate.value,
      approved_by: this.orderReviewForm.controls.approvedBy.value as string,
      approved_date: this.orderReviewForm.controls.approvedDate.value,
      acknowledged_by: this.orderReviewForm.controls.acknowledgedBy.value as string,
      acknowledged_date: this.orderReviewForm.controls.acknowledgedDate.value,
      received_by: this.orderReviewForm.controls.receivedBy.value as string,
      received_date: this.orderReviewForm.controls.receivedDate.value,
      completed_by: this.orderReviewForm.controls.completedBy.value as string,
      completed_date: this.orderReviewForm.controls.completedDate.value,
    }

    console.log(data);

    this.procurementApi.putOrderReview(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteOrderReview(){
    this.procurementApi.deleteOrderReview()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      }) 
  }

}
