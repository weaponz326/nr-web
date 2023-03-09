import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AdminApiService } from 'projects/school/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/school/src/app/models/modules/admin/admin.model';


@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.scss']
})
export class AccessFormComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private adminApi: AdminApiService,
  ) { }

  @Input() isCreator = false;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  accessForm: UserAccess = {
    account: this.customCookie.getCookie('restaurant_id') as string,
    admin_access: false,
    portal_access:  false,
    settings_access: false,
    parents_access: false,
    assessment_access: false,
    subjects_access: false,
    attendance_access: false,
    students_access: false,
    lesson_plan_access: false,
    reports_access: false,
    teachers_access: false,
    payments_access: false,
    terms_access: false,
    classes_access: false,
    timetable_access: false,
    fees_access: false,
    sections_access: false,
  }

  ngOnInit(): void {
    this.getUserAccess();
  }

  getUserAccess(){
    this.adminApi.getUserAccess()
    .subscribe({
        next: (res) => {
          console.log(res);

          this.accessForm.admin_access = res.admin_access;
          this.accessForm.portal_access = res.portal_access;
          this.accessForm.settings_access = res.settings_access;
          this.accessForm.parents_access = res.parents_access;
          this.accessForm.assessment_access = res.assessment_access;
          this.accessForm.subjects_access = res.subjects_access;
          this.accessForm.attendance_access = res.attendance_access;
          this.accessForm.students_access = res.students_access;
          this.accessForm.lesson_plan_access = res.lesson_plan_access;
          this.accessForm.reports_access = res.reports_access;
          this.accessForm.teachers_access = res.teachers_access;
          this.accessForm.payments_access = res.payments_access;
          this.accessForm.terms_access = res.terms_access;
          this.accessForm.classes_access = res.classes_access;
          this.accessForm.timetable_access = res.timetable_access;
          this.accessForm.fees_access = res.fees_access;
          this.accessForm.sections_access = res.sections_access;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  updateUserAccess(){
    let access: UserAccess = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      admin_access: this.accessForm.admin_access,
      portal_access: this.accessForm.portal_access,
      settings_access: this.accessForm.settings_access,
      parents_access: this.accessForm.parents_access,
      assessment_access: this.accessForm.assessment_access,
      subjects_access: this.accessForm.subjects_access,
      attendance_access: this.accessForm.attendance_access,
      students_access: this.accessForm.students_access,
      lesson_plan_access: this.accessForm.lesson_plan_access,
      reports_access: this.accessForm.reports_access,
      teachers_access: this.accessForm.teachers_access,
      payments_access: this.accessForm.payments_access,
      terms_access: this.accessForm.terms_access,
      classes_access: this.accessForm.classes_access,
      timetable_access: this.accessForm.timetable_access,
      fees_access: this.accessForm.fees_access,
      sections_access: this.accessForm.sections_access,
    }

    this.adminApi.putUserAccess(access)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  setLevelAccess(level: string) {
    console.log("u are changing user level to " + level);

    if (level == 'Admin'){
      this.accessForm.admin_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.settings_access = true;
      this.accessForm.parents_access = true;
      this.accessForm.assessment_access = true;
      this.accessForm.subjects_access = true;
      this.accessForm.attendance_access = true;
      this.accessForm.students_access = true;
      this.accessForm.lesson_plan_access = true;
      this.accessForm.reports_access = true;
      this.accessForm.teachers_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.terms_access = true;
      this.accessForm.classes_access = true;
      this.accessForm.timetable_access = true;
      this.accessForm.fees_access = true;
      this.accessForm.sections_access = true;
    }
    else if (level == 'Manager'){
      this.accessForm.admin_access =  false;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
      this.accessForm.parents_access = true;
      this.accessForm.assessment_access = true;
      this.accessForm.subjects_access = true;
      this.accessForm.attendance_access = true;
      this.accessForm.students_access = true;
      this.accessForm.lesson_plan_access = true;
      this.accessForm.reports_access = true;
      this.accessForm.teachers_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.terms_access = true;
      this.accessForm.classes_access = true;
      this.accessForm.timetable_access = true;
      this.accessForm.fees_access = true;
      this.accessForm.sections_access = true;
    }
    else if (level == 'Staff'){
      this.accessForm.admin_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
      this.accessForm.parents_access = false;
      this.accessForm.assessment_access = false;
      this.accessForm.subjects_access = false;
      this.accessForm.attendance_access = false;
      this.accessForm.students_access = false;
      this.accessForm.lesson_plan_access = false;
      this.accessForm.reports_access = false;
      this.accessForm.teachers_access = false;
      this.accessForm.payments_access = false;
      this.accessForm.terms_access = false;
      this.accessForm.classes_access = false;
      this.accessForm.timetable_access = false;
      this.accessForm.fees_access = false;
      this.accessForm.sections_access = false;
    }
  }

}
