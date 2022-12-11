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
  accounts_access!: boolean;
  admin_access!: boolean;
  appraisal_access!: boolean;
  assets_access!: boolean;
  attendance_access!: boolean;
  budget_access!: boolean;
  employees_access!: boolean;
  files_access!: boolean;
  leave_access!: boolean;
  fiscal_year_access!: boolean;
  ledger_access!: boolean;
  letters_access!: boolean;
  payroll_access!: boolean;
  portal_access!: boolean;
  procurement_access!: boolean;
  reception_access!: boolean;
  settings_access!: boolean;
}
