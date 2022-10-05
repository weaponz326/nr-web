import { Time } from "@angular/common";

export class Roster {
  account!: string;
  roster_code!: string;
  roster_name!: string;
  from_date!: Date;
  to_date!: Date;
}

export class Shift {
  roster!: string;
  shift_name!: string;
  start_time!: Time;
  end_time!: Time;
}

export class Batch {
  roster!: string;
  batch_name!: string;
  batch_symbol!: string;
}

export class Personnel {
  roster!: string;
  staff!: string;
  batch_symbol!: string;
}

export class RosterDay {
  roster!: string;
  shift!: string;
  batch!: string;
  day!: any;
}

export class RosterCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
