import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class TeachersApiService {

  constructor(
    private afs: AngularFirestore,
    private activeTerm: ActiveTermService
  ) { }

  teacherRef = this.afs.collection('school/module_teachers/school_teacher');

  // teachers

  createTeacher(teacher: any){
    return this.teacherRef.add(teacher);
  }

  getTeacher(){
    return this.teacherRef.doc(String(sessionStorage.getItem('school_teacher_id'))).ref.get();
  }

  updateTeacher(teacher: any){
    return this.teacherRef.doc(String(sessionStorage.getItem('school_teacher_id'))).update(teacher);
  }

  deleteTeacher(){
    return this.teacherRef.doc(String(sessionStorage.getItem('school_teacher_id'))).delete();
  }

  getAccountTeacher(sorting: any, pageSize: any){
    return this.teacherRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountTeacherNext(sorting: any, pageSize: any, pageStart: any){
    return this.teacherRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountTeacherPrev(sorting: any, pageSize: any, pageStart: any){
    return this.teacherRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountTeacher(){
    return this.teacherRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

}
