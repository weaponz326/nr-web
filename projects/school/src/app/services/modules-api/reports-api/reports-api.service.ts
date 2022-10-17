import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {

  constructor(private afs: AngularFirestore) { }

  reportRef = this.afs.collection('school/module_reports/school_report');
  reportAssessmentRef = this.afs.collection('school/module_reports/school_report_assessment');
  reportSheetRef = this.afs.collection('school/module_reports/school_report_sheet');

  // report

  createReport(report: any){
    return this.reportRef.add(report);
  }

  getReport(){
    return this.reportRef.doc(String(sessionStorage.getItem('school_report_id'))).ref.get();
  }

  updateReport(report: any){
    return this.reportRef.doc(String(sessionStorage.getItem('school_report_id'))).update(report);
  }

  deleteReport(){
    return this.reportRef.doc(String(sessionStorage.getItem('school_report_id'))).delete();
  }

  getAccountReport(sorting: any, pageSize: any){
    return this.reportRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountReportNext(sorting: any, pageSize: any, pageStart: any){
    return this.reportRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountReportPrev(sorting: any, pageSize: any, pageStart: any){
    return this.reportRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountReport(){
    return this.reportRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy("created_by" ,"desc")
      .get();
  }

  // report report class

  createReportAssessment(reportAssessment: any){
    return this.reportAssessmentRef.add(reportAssessment);
  }

  getReportAssessment(){
    return this.reportAssessmentRef.doc(String(sessionStorage.getItem('school_report_assessment_id'))).ref.get();
  }

  updateReportAssessment(reportAssessment: any){
    return this.reportAssessmentRef.doc(String(sessionStorage.getItem('school_report_assessment_id'))).update(reportAssessment);
  }

  deleteReportAssessment(){
    return this.reportAssessmentRef.doc(String(sessionStorage.getItem('school_report_assessment_id'))).delete();
  }

  getReportReportAssessment(){
    return this.reportAssessmentRef.ref
      .where("report", "==", sessionStorage.getItem('school_report_id'))
      .orderBy("class.data.assessment_name", "asc")
      .get();
  }

  // report sheet

  createReportSheet(sheet: any){
    return this.reportSheetRef.doc(String(sessionStorage.getItem('school_report_id'))).set({sheet: sheet});
  }

  getReportSheet(){
    return this.reportSheetRef.doc(String(sessionStorage.getItem('school_report_id'))).ref.get();
  }

  updateReportSheet(sheet: any){
    return this.reportSheetRef.doc(String(sessionStorage.getItem('school_report_id'))).update(sheet);
  }

  deleteReportSheet(){
    return this.reportSheetRef.doc(String(sessionStorage.getItem('school_report_id'))).delete();
  }

}
