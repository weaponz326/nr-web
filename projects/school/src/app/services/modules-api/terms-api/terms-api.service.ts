import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class TermsApiService {

  constructor(private afs: AngularFirestore) { }

  termRef = this.afs.collection('school/module_terms/school_term');
  activeTermRef = this.afs.collection('school/module_terms/school_active_term');

  // terms

  createTerm(term: any){
    return this.termRef.add(term);
  }

  getTerm(){
    return this.termRef.doc(String(sessionStorage.getItem('school_term_id'))).ref.get();
  }

  updateTerm(term: any){
    return this.termRef.doc(String(sessionStorage.getItem('school_term_id'))).update(term);
  }

  deleteTerm(){
    return this.termRef.doc(String(sessionStorage.getItem('school_term_id'))).delete();
  }

  getAccountTerm(sorting: any, pageSize: any){
    return this.termRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountTermNext(sorting: any, pageSize: any, pageStart: any){
    return this.termRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountTermPrev(sorting: any, pageSize: any, pageStart: any){
    return this.termRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountTerm(){
    return this.termRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

  // active term

  createActiveTerm(active_term: any){
    return this.activeTermRef.doc(String(localStorage.getItem('school_id'))).set(active_term);
  }

  getActiveTerm(){
    return this.activeTermRef.doc(String(localStorage.getItem('school_id'))).ref.get();
  }

  updateActiveTerm(active_term: any){
    return this.activeTermRef.doc(String(localStorage.getItem('school_id'))).update(active_term);
  }

  deleteActiveTerm(){
    return this.activeTermRef.doc(String(localStorage.getItem('school_id'))).delete();
  }

}
