import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectOrderComponent } from '../../../../components/select-windows/orders-windows/select-order/select-order.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { DeliveriesApiService } from 'projects/restaurant/src/app/services/modules-api/deliveries-api/deliveries-api.service';

import { Delivery } from 'projects/restaurant/src/app/models/modules/deliveries/deliveries.model';


@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.component.html',
  styleUrls: ['./new-delivery.component.scss']
})
export class NewDeliveryComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private deliveriesApi: DeliveriesApiService,
    // private deliveriesPrint: DeliveriesPrintService,
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('selectOrderComponentReference', { read: SelectOrderComponent, static: false }) selectOrder!: SelectOrderComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Add Delivery", url: "/home/deliveries/add-delivery" },
  ];

  selectedOrderId = "";

  isDeliverySaving = false;

  deliveryForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl({value: '', disabled: true}),
    customerName: new FormControl({value: '', disabled: true}),
    dateDelivered: new FormControl(''),
    deliveryLocation: new FormControl(''),
    deliveryStatus: new FormControl(''),
  })

  ngOnInit(): void {
  }

  postDelivery(){
    console.log('u are saving a new delivery');

    let data: Delivery = {
      id: this.selectedOrderId,
      account: this.customCookie.getCookie('restaurant_id') as string,
      order: this.selectedOrderId,
      date_delivered: this.deliveryForm.controls.dateDelivered.value as string,
      delivery_location: this.deliveryForm.controls.deliveryLocation.value as string,
      delivery_status: this.deliveryForm.controls.deliveryStatus.value as string,
    }

    console.log(data);

    if(this.selectedOrderId != ""){
      this.isDeliverySaving = true;

      this.deliveriesApi.postDelivery(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            if(res == "exists"){
              this.existButtonElement.nativeElement.click();
            }
            else if (res.id){
              sessionStorage.setItem('restaurant_delivery_id', res.id);
              this.router.navigateByUrl('/home/deliveries/view-delivery');
              this.isDeliverySaving = false;
            }
          },
          error: (err) => {
            console.log(err);
            this.isDeliverySaving = false;
            this.connectionToast.openToast();
          }
        })
    }
  }

  onOrderSelected(orderData: any){
    console.log(orderData);

    this.selectedOrderId = orderData.id;

    this.deliveryForm.controls.orderCode.setValue(orderData.order_code);
    this.deliveryForm.controls.orderDate.setValue(new Date(orderData.order_date).toISOString().slice(0, 16));
    this.deliveryForm.controls.customerName.setValue(orderData.customer_name);
  }

  openOrderWindow(){
    console.log("You are opening select order window")
    this.selectOrder.openModal();
  }

  gotoDelivery(){
    sessionStorage.setItem('restaurant_delivery_id', this.selectedOrderId);
    this.router.navigateByUrl('/home/deliveries/view-delivery');
  }

}
