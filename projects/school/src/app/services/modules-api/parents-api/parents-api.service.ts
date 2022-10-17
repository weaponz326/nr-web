import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class ParentsApiService {

  constructor(
    private afs: AngularFirestore,
    private activeTerm: ActiveTermService
  ) { }

  parentRef = this.afs.collection('school/module_parents/school_parent');
  parentWardRef = this.afs.collection('school/module_parents/school_parent_ward');

  // parents

  createParent(parent: any){
    return this.parentRef.add(parent);
  }

  getParent(){
    return this.parentRef.doc(String(sessionStorage.getItem('school_parent_id'))).ref.get();
  }

  updateParent(parent: any){
    return this.parentRef.doc(String(sessionStorage.getItem('school_parent_id'))).update(parent);
  }

  deleteParent(){
    return this.parentRef.doc(String(sessionStorage.getItem('school_parent_id'))).delete();
  }

  getAccountParent(sorting: any, pageSize: any){
    return this.parentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountParentNext(sorting: any, pageSize: any, pageStart: any){
    return this.parentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountParentPrev(sorting: any, pageSize: any, pageStart: any){
    return this.parentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountParent(){
    return this.parentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

  // parent wards

  createParentWard(parent_ward: any){
    return this.parentWardRef.add(parent_ward);
  }

  getParentWard(wardId: any){
    return this.parentWardRef.doc(wardId).ref.get();
  }

  updateParentWard(wardId: any, wardData: any){
    return this.parentWardRef.doc(wardId).update(wardData);
  }

  deleteParentWard(wardId: any){
    return this.parentWardRef.doc(wardId).delete();
  }

  getParentParentWard(){
    return this.parentWardRef.ref
      .where("parent", "==", sessionStorage.getItem('school_parent_id'))
      .orderBy("created_at", "desc")
      .get();
  }

  // dashboard

  getWeekParent(startDate: any, endDate: any){
    return this.parentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("created_at", "<", startDate).where("created_at", ">", endDate)
      .get();
  }

}
