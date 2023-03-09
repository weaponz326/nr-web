export class AccountUser {
  access_level!: string;
  user!: string;
  account!: string;
}

export class Invitation {
  user!: string;
  account!: string;
  account_type!: string;
  invitation_status!: string;
  date_confirmed!: any;
}

export class UserAccess {
  account!: string;
  admin_access!: boolean;
  portal_access!: boolean;
  settings_access!: boolean;
  parents_access!: boolean;
  assessment_access!: boolean;
  subjects_access!: boolean;
  attendance_access!: boolean;
  students_access!: boolean;
  lesson_plan_access!: boolean;
  reports_access!: boolean;
  teachers_access!: boolean;
  payments_access!: boolean;
  terms_access!: boolean;
  classes_access!: boolean;
  timetable_access!: boolean;
  fees_access!: boolean;
  sections_access!: boolean;
}
