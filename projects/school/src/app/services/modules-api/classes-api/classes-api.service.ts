import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class ClassesApiService {

  constructor(
    private afs: AngularFirestore,
    private activeTerm: ActiveTermService
  ) { }

  classRef = this.afs.collection('school/module_classes/school_class');
  classStudentRef = this.afs.collection('school/module_classes/school_class_student');
  departmentRef = this.afs.collection('school/module_classes/school_department');

  // classes

  createClass(clase: any){
    return this.classRef.add(clase);
  }

  getClass(){
    return this.classRef.doc(String(sessionStorage.getItem('school_class_id'))).ref.get();
  }

  updateClass(clase: any){
    return this.classRef.doc(String(sessionStorage.getItem('school_class_id'))).update(clase);
  }

  deleteClass(){
    return this.classRef.doc(String(sessionStorage.getItem('school_class_id'))).delete();
  }

  getAccountClass(sorting: any, pageSize: any){
    return this.classRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountClassNext(sorting: any, pageSize: any, pageStart: any){
    return this.classRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountClassPrev(sorting: any, pageSize: any, pageStart: any){
    return this.classRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountClass(){
    return this.classRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy("created_by" ,"desc")
      .get();
  }

  // class students

  createClassStudent(class_student: any){
    return this.classStudentRef.add(class_student);
  }

  getClassStudent(){
    return this.classStudentRef.doc(String(sessionStorage.getItem('school_class_student_id'))).ref.get();
  }

  updateClassStudent(class_student: any){
    return this.classStudentRef.doc(String(sessionStorage.getItem('school_class_student_id'))).update(class_student);
  }

  deleteClassStudent(){
    return this.classStudentRef.doc(String(sessionStorage.getItem('school_class_student_id'))).delete();
  }

  getClassClassStudent(){
    return this.classStudentRef.ref
      .where("clase", "==", sessionStorage.getItem('school_class_id'))
      .orderBy("created_at", "desc")
      .get();
  }

  // department

  createDepartment(departmentData: any){
    return this.departmentRef.add(departmentData);
  }

  getDepartment(departmentId: any){
    return this.departmentRef.doc(departmentId).ref.get();
  }

  updateDepartment(departmentId: any, departmentData: any){
    return this.departmentRef.doc(departmentId).update(departmentData);
  }

  deleteDepartment(departmentId: any){
    return this.departmentRef.doc(departmentId).delete();
  }

  getAccountDepartment(sorting: any, pageSize: any){
    return this.departmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountDepartmentNext(sorting: any, pageSize: any, pageStart: any){
    return this.departmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountDepartmentPrev(sorting: any, pageSize: any, pageStart: any){
    return this.departmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountDepartment(){
    return this.departmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("terms", "array-contains", this.activeTerm.getActiveTerm())
      .orderBy("created_by" ,"desc")
      .get();
  }

}
