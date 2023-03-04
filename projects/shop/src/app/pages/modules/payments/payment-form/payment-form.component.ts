import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectOrderComponent } from '../../../../components/select-windows/orders-windows/select-order/select-order.component';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  constructor() { }

  // @ViewChild('selectOrderComponentReference', { read: SelectOrderComponent, static: false }) selectOrder!: SelectOrderComponent;

  selectedOrderId = "";
  selectedOrderData: any;

  paymentForm = new FormGroup({
    paymentCode: new FormControl(''),
    paymentDate: new FormControl(),
    orderCode: new FormControl({value: '', disabled: true}),
    customerName: new FormControl({value: '', disabled: true}),
    totalAmount: new FormControl({value: 0, disabled: true}),
    amountPaid: new FormControl(0),
    balance: new FormControl({value: 0, disabled: true}),
  })

  ngOnInit(): void {
  }

  onOrderSelected(orderData: any){
    console.log(orderData);

    this.selectedOrderId = orderData.id;
    this.selectedOrderData = orderData;

    this.paymentForm.controls.orderCode.setValue(orderData.order_code);
    this.paymentForm.controls.customerName.setValue(orderData.customer_name);
    this.paymentForm.controls.totalAmount.setValue(orderData.order_total);
  }

  openOrderWindow(){
    console.log("You are opening select order window")
    // this.selectOrder.openModal();
  }

  setBalance(){
    let amountPaid = this.paymentForm.controls.amountPaid.value;
    let totalAmount = this.paymentForm.controls.totalAmount.value;

    if(totalAmount != null && amountPaid != null){
      this.paymentForm.controls.balance.setValue(totalAmount - amountPaid);
    }
  }

}
