export class Ward {
    account!: string;
    ward_number!: string;
    ward_name!: string;
    ward_type!: string;
    location!: string;
    capacity!: number;
}

export class WardPatient {
    ward!: string;
    patient!: string;
    checkin_date!: Date;
    checkout_date!: Date;
    bed_number!: string;
}