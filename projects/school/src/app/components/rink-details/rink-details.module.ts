import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentDetailsComponent } from './parent-details/parent-details.component';
import { AssessmentDetailsComponent } from './assessment-details/assessment-details.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { LessonPlanDetailsComponent } from './lesson-plan-details/lesson-plan-details.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { TermDetailsComponent } from './term-details/term-details.component';
import { ClaseDetailsComponent } from './clase-details/clase-details.component';
import { TimetableDetailsComponent } from './timetable-details/timetable-details.component';
import { FeesDetailsComponent } from './fees-details/fees-details.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { SectionDetailsComponent } from './section-details/section-details.component';



@NgModule({
  declarations: [
    ParentDetailsComponent,
    AssessmentDetailsComponent,
    SubjectDetailsComponent,
    AttendanceDetailsComponent,
    StudentDetailsComponent,
    LessonPlanDetailsComponent,
    ReportDetailsComponent,
    TeacherDetailsComponent,
    StaffDetailsComponent,
    PaymentDetailsComponent,
    TermDetailsComponent,
    ClaseDetailsComponent,
    TimetableDetailsComponent,
    FeesDetailsComponent,
    BillDetailsComponent,
    SectionDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RinkDetailsModule { }
