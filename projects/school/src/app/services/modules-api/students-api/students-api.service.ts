import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {

  constructor(
    private afs: AngularFirestore,
    private activeTerm: ActiveTermService
  ) { }

  studentRef = this.afs.collection('school/module_students/school_student');

  // students

  createStudent(student: any){
    return this.studentRef.add(student);
  }

  getStudent(){
    return this.studentRef.doc(String(sessionStorage.getItem('school_student_id'))).ref.get();
  }

  updateStudent(student: any){
    return this.studentRef.doc(String(sessionStorage.getItem('school_student_id'))).update(student);
  }

  deleteStudent(){
    return this.studentRef.doc(String(sessionStorage.getItem('school_student_id'))).delete();
  }

  getAccountStudent(sorting: any, pageSize: any){
    return this.studentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountStudentNext(sorting: any, pageSize: any, pageStart: any){
    return this.studentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountStudentPrev(sorting: any, pageSize: any, pageStart: any){
    return this.studentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountStudent(){
    return this.studentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

}
