import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AssessmentApiService {

  constructor(private afs: AngularFirestore) { }

  assessmentRef = this.afs.collection('school/module_assessment/school_assessment');
  assessmentClassRef = this.afs.collection('school/module_assessment/school_assessment_class');
  assessmentSheetRef = this.afs.collection('school/module_assessment/school_assessment_sheet');

  // assessment

  createAssessment(assessment: any){
    return this.assessmentRef.add(assessment);
  }

  getAssessment(){
    return this.assessmentRef.doc(String(sessionStorage.getItem('school_assessment_id'))).ref.get();
  }

  updateAssessment(assessment: any){
    return this.assessmentRef.doc(String(sessionStorage.getItem('school_assessment_id'))).update(assessment);
  }

  deleteAssessment(){
    return this.assessmentRef.doc(String(sessionStorage.getItem('school_assessment_id'))).delete();
  }

  getAccountAssessment(sorting: any, pageSize: any){
    return this.assessmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountAssessmentNext(sorting: any, pageSize: any, pageStart: any){
    return this.assessmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountAssessmentPrev(sorting: any, pageSize: any, pageStart: any){
    return this.assessmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountAssessment(){
    return this.assessmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy("created_by" ,"desc")
      .get();
  }

  // assessment assessment class

  createAssessmentClass(assessmentClass: any){
    return this.assessmentClassRef.add(assessmentClass);
  }

  getAssessmentClass(){
    return this.assessmentClassRef.doc(String(sessionStorage.getItem('school_assessment_class_id'))).ref.get();
  }

  updateAssessmentClass(assessmentClass: any){
    return this.assessmentClassRef.doc(String(sessionStorage.getItem('school_assessment_class_id'))).update(assessmentClass);
  }

  deleteAssessmentClass(){
    return this.assessmentClassRef.doc(String(sessionStorage.getItem('school_assessment_class_id'))).delete();
  }

  getAssessmentAssessmentClass(){
    return this.assessmentClassRef.ref
      .where("assessment", "==", sessionStorage.getItem('school_assessment_id'))
      .orderBy("clase.data.class_name", "asc")
      .get();
  }

  // assessment sheet

  createAssessmentSheet(sheetData: any){
    return this.assessmentSheetRef.doc(String(sessionStorage.getItem('school_assessment_id'))).set(sheetData);
  }

  getAssessmentSheet(){
    return this.assessmentSheetRef.doc(String(sessionStorage.getItem('school_assessment_id'))).ref.get();
  }

  updateAssessmentSheet(sheet: any){
    return this.assessmentSheetRef.doc(String(sessionStorage.getItem('school_assessment_id'))).update(sheet);
  }

  deleteAssessmentSheet(){
    return this.assessmentSheetRef.doc(String(sessionStorage.getItem('school_assessment_id'))).delete();
  }

  // dashboard

  getWeekAssessment(startDate: any, endDate: any){
    return this.assessmentRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("created_at", "<", startDate).where("created_at", ">", endDate)
      .get();
  }

}
