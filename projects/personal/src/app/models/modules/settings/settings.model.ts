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
  user!: string;
  invitation_status!: string;
  inviter_type!: string;
  inviter_invitation_id!: string;
  inviter_id!: string;
  inviter_name!: string;
  inviter_location!: string;
}

