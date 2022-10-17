import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class LessonPlanApiService {

  constructor(private afs: AngularFirestore) { }

  lessonPlanRef = this.afs.collection('school/module_lesson_plan/school_lesson_plan');
  lessonPlanSheetRef = this.afs.collection('school/module_lesson_plan/school_lesson_planSheet');

  // lessonPlans

  createLessonPlan(lessonPlan: any){
    return this.lessonPlanRef.add(lessonPlan);
  }

  getLessonPlan(){
    return this.lessonPlanRef.doc(String(sessionStorage.getItem('school_lessonPlan_id'))).ref.get();
  }

  updateLessonPlan(lessonPlan: any){
    return this.lessonPlanRef.doc(String(sessionStorage.getItem('school_lessonPlan_id'))).update(lessonPlan);
  }

  deleteLessonPlan(){
    return this.lessonPlanRef.doc(String(sessionStorage.getItem('school_lessonPlan_id'))).delete();
  }

  getAccountLessonPlan(sorting: any, pageSize: any){
    return this.lessonPlanRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .limit(pageSize)
      .get();
  }

  getAccountLessonPlanNext(sorting: any, pageSize: any, pageStart: any){
    return this.lessonPlanRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAfter(pageStart)
      .limit(pageSize)
      .get();
  }

  getAccountLessonPlanPrev(sorting: any, pageSize: any, pageStart: any){
    return this.lessonPlanRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy(sorting?.field, sorting?.direction)
      .startAt(pageStart)
      .limit(pageSize)
      .get();
  }

  getAllAccountLessonPlan(){
    return this.lessonPlanRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("term.id", "==", JSON.parse(String(localStorage.getItem('schoolActiveTerm'))).id)
      .orderBy("created_by" ,"desc")
      .get();
  }

  // dashboard

  getWeekLessonPlan(startDate: any, endDate: any){
    return this.lessonPlanRef.ref
      .where("account", "==", localStorage.getItem('school_id'))
      .where("created_at", "<", startDate).where("created_at", ">", endDate)
      .get();
  }

}
