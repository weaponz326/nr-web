import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { PaystackOptions } from 'angular4-paystack';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { environment } from 'projects/restaurant/src/environments/environment';
import { SettingsApiService } from 'projects/restaurant/src/app/services/modules-api/settings-api/settings-api.service';

import { Subscription } from 'projects/restaurant/src/app/models/modules/settings/settings.model';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(private settingsApi: SettingsApiService) { }

  @ViewChild('paystackButtonElementReference', { read: ElementRef, static: false }) paystackButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Subscription", url: "/home/settings/billing" },
  ];

  // paystackPublicKey = environment.paystackLivePublicKey;
  paystackPublicKey = "";

  isSubscriptionLoading = false;
  isSubscriptionSaving = false;

  subscriptionData: any;

  emailValue = "";
  subscriptionTypeValue = "";
  billingFrequencyValue = "";
  numberUsersValue = 0;

  selectedSubscription = '';
  selectedFrequency = '';
  usersTextBoxIncrement = 1;

  subscriptionSource = ["Individual", "Small Team", "Large Team", "Comprehensive"];
  frequencySource = ["Monthly", "Yearly", ""];
  numberUsersStep = 1;

  isFrequencyDisabled = false;
  isnumberUsersDisabled = false;

  isEmailValid = false;
  isSubscriptionValid = true;
  isFrequencyValid = true;
  isNumberUsersValid = true;

  plans = {
    smallTeamMonthly: "PLN_scww6u5e6ocqtw6",
    smallTeamYearly: "PLN_qxq74hmegjdag94",
    largeTeamMonthly: "PLN_ts2kk0j0cek0sky",
    largeTeamYearly: "PLN_3p7epe1wgthaie7",
  }

  paystackOptions = {
    ref: `${Math.ceil(Math.random() * 10e10)}`,
    plan: "",
    quantity: "",
  };

  metadata = {
    account: localStorage.getItem('restaurant_id'),
    suite: "Restaurant",
    subscription_type: "",
    billing_frequency: "",
    number_users: 0,
  }

  ngOnInit(): void {
    this.getSubscription();
  }

  getSubscription(){
    this.isSubscriptionLoading = true;

    this.settingsApi.getSubscription()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subscriptionData = res;

          this.subscriptionTypeValue = this.subscriptionData.data().subscription_type;
          this.billingFrequencyValue = this.subscriptionData.data().billing_frequency;
          this.numberUsersValue = this.subscriptionData.data().number_users;

          this.isSubscriptionLoading = false;
          this.setSubscription(this.subscriptionTypeValue);
          this.setOptions();
        },
        error: (err) => {
          console.log(err);
          this.isSubscriptionLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateSubscription(){
    let data = {
      subscription_type: this.subscriptionTypeValue,
      billing_frequency: this.billingFrequencyValue,
      number_users: this.numberUsersValue,
    }

    this.settingsApi.patchSubscription(data)
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

  setSubscription(event: any){
    this.selectedSubscription = event.target.value;
    console.log(this.selectedSubscription);

    if (this.selectedSubscription == "Individual"){
      this.billingFrequencyValue = "";
      this.numberUsersValue = 1;
      this.isFrequencyDisabled = true;
      this.isnumberUsersDisabled = true;
    }
    else if (this.selectedSubscription == "Small Team"){
      this.numberUsersStep = 10;
      this.numberUsersValue = 10;
      this.isFrequencyDisabled = false;
      this.isnumberUsersDisabled = false;
    }
    else if (this.selectedSubscription == "Large Team"){
      this.numberUsersStep = 50;
      this.numberUsersValue = 50;
      this.isFrequencyDisabled = false;
      this.isnumberUsersDisabled = false;
    }
    else if (this.selectedSubscription == "Comprehensive"){
      this.billingFrequencyValue = "";
      this.numberUsersValue = 0;
      this.isFrequencyDisabled = true;
      this.isnumberUsersDisabled = true;
    }

    this.setOptions();
  }

  setFrequency(event: any){
    this.selectedFrequency = event.target.value;
    console.log(this.selectedFrequency);

    if (this.selectedSubscription == "Small Team"){
      this.numberUsersStep = 10;
      this.numberUsersValue = 10;
    }
    else if (this.selectedSubscription == "Large Team"){
      this.numberUsersStep = 50;
      this.numberUsersValue = 50;
    }

    this.setOptions();
  }

  setOptions(){
    var plan = "";
    var quantity = "";

    if (this.subscriptionTypeValue == "Small Team"){
      if (this.billingFrequencyValue == "Monthly")
        plan = this.plans.smallTeamMonthly;
      else if (this.billingFrequencyValue == "Yearly")
        plan = this.plans.smallTeamYearly;
    }
    else if (this.subscriptionTypeValue == "Large Team"){
      if (this.billingFrequencyValue == "Monthly")
        plan = this.plans.largeTeamMonthly;
      else if (this.billingFrequencyValue == "Yearly")
        plan = this.plans.largeTeamYearly;
    }

    if (this.subscriptionTypeValue == "Small Team"){
      quantity = String(this.numberUsersValue / 10);
    }
    else if (this.subscriptionTypeValue == "Large Team"){
      quantity = String(this.numberUsersValue / 50);
    }

    this.paystackOptions.plan = plan;
    this.paystackOptions.quantity = quantity;

    this.metadata.subscription_type = this.subscriptionTypeValue;
    this.metadata.billing_frequency = this.billingFrequencyValue;
    this.metadata.number_users = this.numberUsersValue;
  }

  validateSubcriptionForm(f: NgForm) {
    if (f.controls['email'].invalid){
      console.log("email invalid");
      return false;
    }

    if ((this.subscriptionTypeValue == "Small Team" || this.subscriptionTypeValue == "Large Team") && this.billingFrequencyValue == ""){
      this.isFrequencyValid = false;
      return false;
    }
    else{
      this.isFrequencyValid = true;
    }

    if (this.subscriptionTypeValue == "Small Team" && (this.numberUsersValue % 10) != 0){
      this.isNumberUsersValid = false;
      return false;
    }
    else{
      this.isNumberUsersValid = true;
    }

    if (this.subscriptionTypeValue == "Large Team" && (this.numberUsersValue % 50) != 0){
      this.isNumberUsersValid = false;
      return false;
    }
    else{
      this.isNumberUsersValid = true;
    }

    console.log("opening paystack!");
    this.paystackButton.nativeElement.click();
    return true;
  }

  paymentInit() {
    console.log('Payment initialized');
    console.log(this.emailValue);
    console.log(this.paystackOptions);
  }

  paymentDone(ref: any) {
    console.log('Payment done');
  }

  paymentCancel() {
    console.log('payment failed');
    this.paystackOptions.ref = `${Math.ceil(Math.random() * 10e10)}`;
  }

}
