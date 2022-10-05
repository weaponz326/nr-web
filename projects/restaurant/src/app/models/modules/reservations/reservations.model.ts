export class Reservation {
  account!: string;
  customer!: string;
  customer_name!: string;
  reservation_code!: string;
  reservation_date!: Date;
  arrival_date!: Date;
  number_guests!: any;
  number_tables!: any;
  status!: string;
}

export class ReservationTable {
  reservation!: string;
  table!: string;
}

export class ReservationCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
