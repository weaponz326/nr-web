export class StudentAttendance {
  account!: string;
  term!: string;
  clase!: string;
  attendance_code!: string;
  attendance_name!: string;
  from_date!: string;
  to_date!: string;
}

export class TeacherAttendance {
  account!: string;
  term!: string;
  attendance_code!: string;
  attendance_name!: string;
  from_date!: string;
  to_date!: string;
}

export class AttendanceSheet {
  sheet!: any;
}
