export class Guest {
    account!: string;
    guest_code!: string;
    guest_name!: string;
    guest_type!: string;
    phone!: string;
    email!: string;
    address!: string;
    state!: string;
    city!: string;
}
  
export class GuestCodeConfig {
    entry_mode!: string;
    prefix!: string;
    last_code!: string;
    suffix!: string;
}
  