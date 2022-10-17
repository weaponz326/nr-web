import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FeesApiService {

  constructor(private afs: AngularFirestore) { }

  feesRef = this.afs.collection('school/module_fees/school_fees');
  feesTargetRef = this.afs.collection('school/module_fees/school_fees_target');
  feesItemRef = this.afs.collection('school/module_fees/school_fees_item');
  billRef = this.afs.collection('school/module_fees/school_fees_bill');

  // fees

  createFees(fees: any){
    return this.feesRef.add(fees);
  }

  getFees(){
    return this.feesRef.doc(String(sessionStorage.getItem('school_fees_id'))).ref.get();
  }

  updateFees(fees: any){
    return this.feesRef.doc(String(sessionStorage.getItem('school_fees_id'))).update(fees);
  }

  deleteFees(){
    return this.feesRef.doc(String(sessionStorage.getItem('school_fees_id'))).delete();
  }

  getAccountFees(sorting: any, pageSize: any){
    return this.feesRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountFeesNext(sorting: any, pageSize: any, pageStart: any){
    return this.feesRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountFeesPrev(sorting: any, pageSize: any, pageStart: any){
    return this.feesRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountFees(){
    return this.feesRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

  // feesTarget

  createFeesTarget(feesTarget: any){
    return this.feesTargetRef.add(feesTarget);
  }

  getFeesTarget(){
    return this.feesTargetRef.doc(String(sessionStorage.getItem('school_fees_target_id'))).ref.get();
  }

  updateFeesTarget(feesTarget: any){
    return this.feesTargetRef.doc(String(sessionStorage.getItem('school_fees_target_id'))).update(feesTarget);
  }

  deleteFeesTarget(){
    return this.feesTargetRef.doc(String(sessionStorage.getItem('school_fees_target_id'))).delete();
  }

  getFeesFeesTarget(){
    return this.feesTargetRef.ref
      .where("fees", "==", sessionStorage.getItem('school_fees_id'))
      .get();
  }

  // feesItem

  createFeesItem(feesItemData: any){
    return this.feesItemRef.add(feesItemData);
  }

  getFeesItem(feesItemId: any){
    return this.feesItemRef.doc(feesItemId).ref.get();
  }

  updateFeesItem(feesItemId: any, feesItemData: any){
    return this.feesItemRef.doc(feesItemId).update(feesItemData);
  }

  deleteFeesItem(feesItemId: any){
    return this.feesItemRef.doc(feesItemId).delete();
  }

  getFeesFeesItem(){
    return this.feesItemRef.ref
      .where("fees", "==", sessionStorage.getItem('school_fees_id'))
      .get();
  }

  // bill

  createBill(bill: any){
    return this.billRef.add(bill);
  }

  getBill(){
    return this.billRef.doc(String(sessionStorage.getItem('school_fees_bill_id'))).ref.get();
  }

  updateBill(bill: any){
    return this.billRef.doc(String(sessionStorage.getItem('school_fees_bill_id'))).update(bill);
  }

  deleteBill(){
    return this.billRef.doc(String(sessionStorage.getItem('school_fees_bill_id'))).delete();
  }

  getAccountBill(sorting: any, pageSize: any){
    return this.billRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountBillNext(sorting: any, pageSize: any, pageStart: any){
    return this.billRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountBillPrev(sorting: any, pageSize: any, pageStart: any){
    return this.billRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountBill(){
    return this.billRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

}
