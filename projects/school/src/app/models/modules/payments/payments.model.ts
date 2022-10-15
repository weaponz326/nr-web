import { Bill } from '../fees/fees.model';

export class Payment {
  account!: string;
  bill!: string;
  term!: string;
  payment_code!: string;
  payment_date!: string;
  amount_paid!: string;
}
