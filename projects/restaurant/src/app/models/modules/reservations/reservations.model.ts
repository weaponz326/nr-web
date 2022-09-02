export class Reservation {
    account!: string;
    customer!: string;
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
  