import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  paymentRef = this.afs.collection('school/module_payments/school_payment');

  // payments

  createPayment(payment: any){
    return this.paymentRef.add(payment);
  }

  getPayment(){
    return this.paymentRef.doc(String(sessionStorage.getItem('school_payment_id'))).ref.get();
  }

  updatePayment(payment: any){
    return this.paymentRef.doc(String(sessionStorage.getItem('school_payment_id'))).update(payment);
  }

  deletePayment(){
    return this.paymentRef.doc(String(sessionStorage.getItem('school_payment_id'))).delete();
  }

  getAccountPayment(sorting: any, pageSize: any){
    return this.paymentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountPaymentNext(sorting: any, pageSize: any, pageStart: any){
    return this.paymentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountPaymentPrev(sorting: any, pageSize: any, pageStart: any){
    return this.paymentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountPayment(){
    return this.paymentRef.ref
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_at", "desc")
      .get();
  }

  // dashboard

  getWeekPayment(startDate: any, endDate: any){
    return this.paymentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("created_at", "<", startDate).where("created_at", ">", endDate)
      .get();
  }

}
