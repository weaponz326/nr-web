export class StudentAttendance {
  account!: string;
  term!: string;
  clase!: string;
  attendance_code!: string;
  attendance_name!: string;
  from_date!: Date;
  to_date!: Date;
}

export class TeacherAttendance {
  account!: string;
  term!: string;
  attendance_code!: string;
  attendance_name!: string;
  from_date!: Date;
  to_date!: Date;
}

export class AttendanceSheet {
  sheet!: any;
}
