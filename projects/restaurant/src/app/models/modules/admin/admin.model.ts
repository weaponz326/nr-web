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
  customers_access!: boolean;
  deliveries_access!: boolean;
  kitchen_stock_access!: boolean;
  menu_access!: boolean;
  orders_access!: boolean;
  payments_access!: boolean;
  portal_access!: boolean;
  roster_access!: boolean;
  settings_access!: boolean;
  staff_access!: boolean;
  reservations_access!: boolean;
  tables_access!: boolean;
}
