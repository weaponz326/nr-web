// import { Account } from 'projects/restaurant/src/app/models/account/account.model';

export class ExtendedProfile {
  date_of_birth!: string;
  gender!: string;
  phone!: string;
  address!: string;
  country!: string;
  state!: string;
  city!: string;
}

export class Invitation {
  created_at!: any;
  user!: string;
  invitation_status!: string;
  account_type!: string;
}

