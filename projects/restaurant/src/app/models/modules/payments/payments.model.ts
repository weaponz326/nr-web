export class Payment {
  order!: string;
  account!: string;
  payment_code!: string;
  payment_date!: Date;
  amount_paid!: number;
}

export class PaymentCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
