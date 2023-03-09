export class Calendar {
  user!: string;
  calendar_code!: string;
  calendar_name!: string;
}

export class Schedule {
  calendar!: string;
  schedule_name!: string;
  description!: string;
  start_date!: Date;
  end_date!: Date;
  location!: string;
  status!: string;
}
