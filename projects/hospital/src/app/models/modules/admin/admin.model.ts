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
  portal_access!: boolean;
  settings_access!: boolean;
  patients_access!: boolean;
  appointments_access!: boolean;
  staff_access!: boolean;
  bills_access!: boolean;
  doctors_access!: boolean;
  laboratory_access!: boolean;
  payments_access!: boolean;
  nurses_access!: boolean;
  prescriptions_access!: boolean;
  diagnosis_access!: boolean;
  drugs_access!: boolean;
  wards_access!: boolean;
  admissions_access!: boolean;
  dispensary_access!: boolean;
  roster_access!: boolean;
}
