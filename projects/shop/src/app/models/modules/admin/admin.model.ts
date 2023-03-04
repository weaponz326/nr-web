export class AccountUser {
  access_level!: string;
  user!: string;
  account!: string;
}

export class Invitation {
  user!: string;
  account!: string;
  account_type!: string;
  invitation_status!: string;
  date_confirmed!: any;
}

export class UserAccess {
  account!: string;
  admin_access!: boolean;
  cashflow_access!: boolean;
  customers_access!: boolean;
  inventory_access!: boolean;
  invoice_access!: boolean;
  marketting_access!: boolean;
  orders_access!: boolean;
  payables_access!: boolean;
  payments_access!: boolean;
  portal_access!: boolean;
  products_access!: boolean;
  purchasing_access!: boolean;
  receivables_access!: boolean;
  sales_access!: boolean;
  settings_access!: boolean;
  staff_access!: boolean;
  suppliers_access!: boolean;
}
