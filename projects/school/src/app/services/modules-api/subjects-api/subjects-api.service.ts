import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class SubjectsApiService {

  constructor(
    private afs: AngularFirestore,
    private activeTerm: ActiveTermService
  ) { }

  subjectRef = this.afs.collection('school/module_subjects/school_subject');
  subjectTeacherRef = this.afs.collection('school/module_subjects/school_subject_teacher');

  // subjects

  createSubject(subject: any){
    return this.subjectRef.add(subject);
  }

  getSubject(){
    return this.subjectRef.doc(String(sessionStorage.getItem('school_subject_id'))).ref.get();
  }

  updateSubject(subject: any){
    return this.subjectRef.doc(String(sessionStorage.getItem('school_subject_id'))).update(subject);
  }

  deleteSubject(){
    return this.subjectRef.doc(String(sessionStorage.getItem('school_subject_id'))).delete();
  }

  getAccountSubject(sorting: any, pageSize: any){
    return this.subjectRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountSubjectNext(sorting: any, pageSize: any, pageStart: any){
    return this.subjectRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountSubjectPrev(sorting: any, pageSize: any, pageStart: any){
    return this.subjectRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountSubject(){
    return this.subjectRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

  // subject teachers

  createSubjectTeacher(subject_teacher: any){
    return this.subjectTeacherRef.add(subject_teacher);
  }

  getSubjectTeacher(){
    return this.subjectTeacherRef.doc(String(sessionStorage.getItem('school_subject_teacher_id'))).ref.get();
  }

  updateSubjectTeacher(subject_teacher: any){
    return this.subjectTeacherRef.doc(String(sessionStorage.getItem('school_subject_teacher_id'))).update(subject_teacher);
  }

  deleteSubjectTeacher(){
    return this.subjectTeacherRef.doc(String(sessionStorage.getItem('school_subject_teacher_id'))).delete();
  }

  getSubjectSubjectTeacher(){
    return this.subjectTeacherRef.ref
      .where("subject", "==", sessionStorage.getItem('school_subject_id'))
      .orderBy("created_at", "desc")
      .get();
  }

  // dashboard

  getWeekSubject(startDate: any, endDate: any){
    return this.subjectRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("created_at", "<", startDate).where("created_at", ">", endDate)
      .get();
  }

}
