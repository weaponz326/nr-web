export class Account {
    account!: string;
    account_name!: string;
    account_number!: string;
    bank_name!: string;
    account_type!: string;
  }
  
  export class Transaction {
    account!: any;
    transaction_date!: Date;
    description!: string;
    transaction_type!: string;
    amount!: number;
  }
  