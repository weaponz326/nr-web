export class Customer {
  account!: string;
  customer_code!: string;
  customer_name!: string;
  customer_type!: string;
  phone!: string;
  email!: string;
  address!: string;
  state!: string;
  city!: string;
  allergies!: string;
  preferences!: string;
}

export class CustomerCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
