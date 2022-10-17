import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class SectionsApiService {

  constructor(
    private afs: AngularFirestore,
    private activeTerm: ActiveTermService
  ) { }

  sectionRef = this.afs.collection('school/module_sections/school_section');
  sectionStudentRef = this.afs.collection('school/module_sections/school_section_student');

  // section

  createSection(section: any){
    return this.sectionRef.add(section);
  }

  getSection(){
    return this.sectionRef.doc(String(sessionStorage.getItem('school_section_id'))).ref.get();
  }

  updateSection(section: any){
    return this.sectionRef.doc(String(sessionStorage.getItem('school_section_id'))).update(section);
  }

  deleteSection(){
    return this.sectionRef.doc(String(sessionStorage.getItem('school_section_id'))).delete();
  }

  getAccountSection(sorting: any, pageSize: any){
    return this.sectionRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountSectionNext(sorting: any, pageSize: any, pageStart: any){
    return this.sectionRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountSectionPrev(sorting: any, pageSize: any, pageStart: any){
    return this.sectionRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountSection(){
    return this.sectionRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

  // sectionStudent

  createSectionStudent(sectionStudent: any){
    return this.sectionStudentRef.add(sectionStudent);
  }

  getSectionStudent(){
    return this.sectionStudentRef.doc(String(sessionStorage.getItem('school_section_student_id'))).ref.get();
  }

  updateSectionStudent(sectionStudent: any){
    return this.sectionStudentRef.doc(String(sessionStorage.getItem('school_section_student_id'))).update(sectionStudent);
  }

  deleteSectionStudent(){
    return this.sectionStudentRef.doc(String(sessionStorage.getItem('school_section_student_id'))).delete();
  }

  getSectionSectionStudent(sorting: any, pageSize: any){
    return this.sectionStudentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getSectionSectionStudentNext(sorting: any, pageSize: any, pageStart: any){
    return this.sectionStudentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getSectionSectionStudentPrev(sorting: any, pageSize: any, pageStart: any){
    return this.sectionStudentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllSectionSectionStudent(){
    return this.sectionStudentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

}
