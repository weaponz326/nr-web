export class Timetable {
  account!: string;
  term!: string;
  timetable_code!: string;
  timetable_name!: string;
}

export class TimetablePeriod {
  timetable!: string;
  period!: string;
  period_start!: string;
  period_end!: string;
}

export class TimetableClass {
  timetable!: string;
  clase!: string;
}

export class TimetableSheet {
  timetable!: string;
  clase!: string;
}
