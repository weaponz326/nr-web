import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DeliveryFormComponent } from '../delivery-form/delivery-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { DeliveriesApiService } from 'projects/restaurant/src/app/services/modules-api/deliveries-api/deliveries-api.service';
// import { DeliveriesPrintService } from 'projects/restaurant/src/app/services/printing/deliveries-print/deliveries-print.service';

import { Delivery } from 'projects/restaurant/src/app/models/modules/deliveries/deliveries.model';


@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.scss']
})
export class EditDeliveryComponent implements OnInit {

  constructor(
    private router: Router,
    private deliveriesApi: DeliveriesApiService,
    // private deliveriesPrint: DeliveriesPrintService,
  ) { }

  @ViewChild('deliveryFormComponentReference', { read: DeliveryFormComponent, static: false }) deliveryForm!: DeliveryFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Deliveries", url: "/home/deliveries/all-deliveries" },
    { text: "View Delivery", url: "/home/deliveries/view-delivery" },
  ];

  deliveryData: any;

  isDeliveryLoading = false;
  isDeliverySaving = false;
  isDeliveryDeleting = false;

  ngOnInit(): void {
    this.getDelivery();
  }

  getDelivery(){
    this.isDeliveryLoading = true;

    this.deliveriesApi.getDelivery()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.deliveryData = res;
          this.isDeliveryLoading = false;

          this.deliveryForm.deliveryForm.controls.orderCode.setValue(this.deliveryData.order.order_code);
          this.deliveryForm.deliveryForm.controls.orderDate.setValue(this.deliveryData.order.order_date);
          this.deliveryForm.deliveryForm.controls.customerName.setValue(this.deliveryData.order.customer.customer_name);
          this.deliveryForm.deliveryForm.controls.dateDelivered.setValue(this.deliveryData.date_delivered);
          this.deliveryForm.deliveryForm.controls.deliveryLocation.setValue(this.deliveryData.delivery_location);
          this.deliveryForm.deliveryForm.controls.deliveryStatus.setValue(this.deliveryData.delivery_status);

          this.deliveryForm.orderId = this.deliveryData.id;
        },
        error: (err) => {
          console.log(err);
          this.isDeliveryLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateDelivery(){
    console.log('u are saving a new delivery');

    let data = {
      date_delivered: this.deliveryForm.deliveryForm.controls.dateDelivered.value,
      delivery_location: this.deliveryForm.deliveryForm.controls.deliveryLocation.value,
      delivery_status: this.deliveryForm.deliveryForm.controls.deliveryStatus.value,
    }

    console.log(data);
    this.isDeliverySaving = true;

    this.deliveriesApi.putDelivery(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isDeliverySaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isDeliverySaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteDelivery(){
    this.isDeliveryDeleting = true;

    this.deliveriesApi.deleteDelivery()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/deliveries/all-deliveries');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.deliveriesPrint.printViewDelivery();
  }

}
