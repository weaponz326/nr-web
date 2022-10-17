import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class TimetableApiService {

  constructor(private afs: AngularFirestore) { }

  timetableRef = this.afs.collection('school/module_timetable/school_timetable');
  timetableSheetRef = this.afs.collection('school/module_timetable/school_timetable_sheet');

  // timetable

  createTimetable(timetable: any){
    return this.timetableRef.add(timetable);
  }

  getTimetable(){
    return this.timetableRef.doc(String(sessionStorage.getItem('school_timetable_id'))).ref.get();
  }

  updateTimetable(timetable: any){
    return this.timetableRef.doc(String(sessionStorage.getItem('school_timetable_id'))).update(timetable);
  }

  deleteTimetable(){
    return this.timetableRef.doc(String(sessionStorage.getItem('school_timetable_id'))).delete();
  }

  getAccountTimetable(sorting: any, pageSize: any){
    return this.timetableRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountTimetableNext(sorting: any, pageSize: any, pageStart: any){
    return this.timetableRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountTimetablePrev(sorting: any, pageSize: any, pageStart: any){
    return this.timetableRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountTimetable(){
    return this.timetableRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

  // sheet

  createTimetableSheet(sheet: any){
    return this.timetableSheetRef.doc(String(sessionStorage.getItem('school_timetable_id'))).set(sheet);
  }

  getTimetableSheet(){
    return this.timetableSheetRef.doc(String(sessionStorage.getItem('school_timetable_id'))).ref.get();
  }

  updateTimetableSheet(timetable: any){
    return this.timetableSheetRef.doc(String(sessionStorage.getItem('school_timetable_id'))).update(timetable);
  }

  deleteTimetableSheet(){
    return this.timetableSheetRef.doc(String(sessionStorage.getItem('school_timetable_id'))).delete();
  }

}
