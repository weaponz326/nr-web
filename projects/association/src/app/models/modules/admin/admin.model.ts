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
  action_plan_access!: boolean;
  admin_access!: boolean;
  attendance_access!: boolean;
  committees_access!: boolean;
  dues_access!: boolean;
  executives_access!: boolean;
  fiscal_year_access!: boolean;
  groups_access!: boolean;
  meetings_access!: boolean;
  members_access!: boolean;
  portal_access!: boolean;
  settings_access!: boolean;
}
