import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { environment } from 'projects/hospital/src/environments/environment';
import { SettingsApiService } from 'projects/hospital/src/app/services/modules-api/settings-api/settings-api.service';

import { Subscription } from 'projects/hospital/src/app/models/modules/settings/settings.model';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(private settingsApi: SettingsApiService) { }

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) changePlanButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Subscription", url: "/home/settings/billing" },
  ];

  paystackPublicKey = environment.paystackLivePublicKey;

  isSubscriptionLoading = false;
  isSubscriptionSaving = false;

  hasExistingSubscription = false;

  subscriptionData: any;

  emailValue = "";
  subscriptionTypeValue = "";
  billingFrequencyValue = "";
  numberUsersValue = 0;
  subscriptionStatusValue = "";

  selectedSubscription = '';
  selectedFrequency = '';
  usersTextBoxIncrement = 1;

  subscriptionSource = ["Individual", "Small Team", "Large Team", "Comprehensive"];
  frequencySource = ["Monthly", "Yearly", ""];
  numberUsersStep = 1;

  isFrequencyDisabled = false;
  isnumberUsersDisabled = false;

  isEmailValid = true;
  isSubscriptionValid = true;
  isFrequencyValid = true;
  isNumberUsersValid = true;

  plans: any;

  livePlans = {
    smallTeamMonthly: "PLN_scww6u5e6ocqtw6",
    smallTeamYearly: "PLN_qxq74hmegjdag94",
    largeTeamMonthly: "PLN_ts2kk0j0cek0sky",
    largeTeamYearly: "PLN_3p7epe1wgthaie7",
  }

  testPlans = {
    smallTeamMonthly: "PLN_p12s1849sda2sqf",
    smallTeamYearly: "PLN_am1r0xh2rztul6z",
    largeTeamMonthly: "PLN_se4st8msr9i1h21",
    largeTeamYearly: "PLN_l54q1rmtnbfyg7n",
  }

  paystackOptions = {
    plan: "",
    quantity: 1,
  };

  ngOnInit(): void {
    // change plan for test or live deployment
    this.plans = this.testPlans;  

    this.getSubscription();  
  }

  getSubscription(){
    this.isSubscriptionLoading = true;

    this.settingsApi.getSubscription()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.subscription_type != "Individual")
            this.hasExistingSubscription = true;

          this.subscriptionData = res;

          this.emailValue = this.subscriptionData.email;
          this.subscriptionTypeValue = this.subscriptionData.subscription_type;
          this.billingFrequencyValue = this.subscriptionData.billing_frequency;
          this.numberUsersValue = this.subscriptionData.number_users;
          this.subscriptionStatusValue = this.subscriptionData.status;

          this.isSubscriptionLoading = false;
          this.selectedSubscription = this.subscriptionTypeValue;
          this.selectedFrequency = this.billingFrequencyValue;
          this.setFormFields();
        },
        error: (err) => {
          console.log(err);
          this.isSubscriptionLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateSubscription(){
    let data: Subscription = {
      customer_code: "",
      subscription_code: "",
      subscription_type: this.subscriptionTypeValue,
      billing_frequency: this.billingFrequencyValue,
      number_users: this.numberUsersValue,
      email: this.emailValue,
      plan: this.paystackOptions.plan,
      quantity: this.paystackOptions.quantity,
      status: "Pending"
    }

    console.log(data);
    this.isSubscriptionSaving = true;

    this.settingsApi.putSubscription(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.isSubscriptionSaving = false;
          
          if(res.status == true)
          window.open(res.data.authorization_url, '_blank');
        },
        error: (err) => {
          console.log(err);
          this.isSubscriptionSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  openChangePlanModal(){
    this.changePlanButtonElement.nativeElement.click();
  }

  setSubscription(event: any){
    this.selectedSubscription = event.target.value;
    console.log(this.selectedSubscription);

    if(this.selectedFrequency == "" || this.selectedFrequency == null){
      this.billingFrequencyValue = "Monthly";
      this.selectedFrequency = "Monthly";
    }

    this.setFormFields();
  }

  setFrequency(event: any){
    this.selectedFrequency = event.target.value;
    console.log(this.selectedFrequency);

    this.setFormFields();
  }

  setFormFields(){
    console.log(this.selectedSubscription);

    // sunscription type field
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

    // billing frequency field
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
    console.log("setting options...");

    var plan = "";
    var quantity = 1;

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
      quantity = this.numberUsersValue / 10;
    }
    else if (this.subscriptionTypeValue == "Large Team"){
      quantity = this.numberUsersValue / 50;
    }

    this.paystackOptions.plan = plan;
    this.paystackOptions.quantity = quantity;
  }

  validateSubcriptionForm(f: NgForm) {
    if (f.controls['email'].invalid){
      console.log("email invalid");
      this.isEmailValid = false;
      return false;
    }
    else{
      console.log("email valid");
      this.isEmailValid = true;
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

    if(this.hasExistingSubscription = true) 
      this.updateSubscription();
    else
      this.openChangePlanModal();

    return true;
  }

}
