import { Component, OnInit, ViewChild } from '@angular/core';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AdminApiService } from '../../services/modules-api/admin-api/admin-api.service';
import { TermsApiService } from 'projects/school/src/app/services/modules-api/terms-api/terms-api.service';


@Component({
  selector: 'app-module-home',
  templateUrl: './module-home.page.html',
  styleUrls: ['./module-home.page.scss']
})
export class ModuleHomePage implements OnInit {

  constructor(
    private adminApi: AdminApiService,
    private termsApi: TermsApiService
  ) { }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  access: any;
  level: any;

  isAccessLoading = false;

  ngOnInit(): void {
    this.getAccountUserLevel();
    this.getAccessAccess();
    this.getActiveTerm();
  }

  getAccountUserLevel() {
    this.adminApi.getAccountUserLevel()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.level = res;
          localStorage.setItem("hotelUserLevel", JSON.stringify(res));
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getAccessAccess() {
    this.isAccessLoading = true;

    this.adminApi.getAccessAccess()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.access = res;
          localStorage.setItem("schoolUserAccess", JSON.stringify(res));

          this.isAccessLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isAccessLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  getActiveTerm(){
    this.termsApi.getActiveTerm()
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem("schoolActiveTerm", JSON.stringify(res));
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  checkAccess(module: string){
    console.log(this.access);

    if (module == "admin" && (!this.access.admin_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "portal" && (!this.access.portal_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "settings" && (!this.access.settings_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "assessment_access"  && !this.access.assessment_access)
      this.accessToast.openToast();
    else if (module == "attendance_access"  && !this.access.attendance_access)
      this.accessToast.openToast();
    else if (module == "classes_access"  && !this.access.classes_access)
      this.accessToast.openToast();
    else if (module == "fees_access"  && !this.access.fees_access)
      this.accessToast.openToast();
    else if (module == "lesson_notes_access"  && !this.access.lesson_notes_access)
      this.accessToast.openToast();
    else if (module == "parents_access"  && !this.access.parents_access)
      this.accessToast.openToast();
    else if (module == "payments_access"  && !this.access.payments_access)
      this.accessToast.openToast();
    else if (module == "reports_access"  && !this.access.reports_access)
      this.accessToast.openToast();
    else if (module == "sections_access"  && !this.access.sections_access)
      this.accessToast.openToast();
    else if (module == "students_access"  && !this.access.students_access)
      this.accessToast.openToast();
    else if (module == "subjects_access"  && !this.access.subjects_access)
      this.accessToast.openToast();
    else if (module == "teachers_access"  && !this.access.teachers_access)
      this.accessToast.openToast();
    else if (module == "terms_access"  && !this.access.terms_access)
      this.accessToast.openToast();
    else if (module == "timetable_access"  && !this.access.timetable_access)
      this.accessToast.openToast();
    else
      console.log("Access granted :)");
  }

}
