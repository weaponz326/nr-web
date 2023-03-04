export class Bill {
    account!: string;
    guest!: string;
    bill_code!: string;
    bill_date!: string;
    total_amount!: number;
}

export class CheckinCharge {
    bill!: string;
    checkin!: string;
    item_number!: number;
}

export class ServiceCharge {
    bill!: string;
    service!: string;
    item_number!: number;
}