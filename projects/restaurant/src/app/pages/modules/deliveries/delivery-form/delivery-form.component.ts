import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {

  constructor(private router: Router) { }

  orderId: any;

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

  gotoOrder(){
    sessionStorage.setItem('restaurant_order_id', this.orderId);
    this.router.navigateByUrl('/home/orders/view-order')
  }

}
