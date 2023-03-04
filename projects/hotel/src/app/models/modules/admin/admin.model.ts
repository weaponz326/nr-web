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
  assets_access!: boolean;
  bills_access!: boolean;
  bookings_access!: boolean;
  checkin_access!: boolean;
  guests_access!: boolean;
  house_keeping_access!: boolean;
  payments_access!: boolean;
  portal_access!: boolean;
  rooms_access!: boolean;
  roster_access!: boolean;
  services_access!: boolean;
  settings_access!: boolean;
  staff_access!: boolean;
}
