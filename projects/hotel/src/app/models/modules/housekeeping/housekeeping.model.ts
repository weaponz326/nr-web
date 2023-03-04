export class Housekeeping {
    account!: string;
    room!: string;
    housekeeping_code!: string;
    housekeeping_date!: Date;
}

export class Checklist {
    housekeeping!: string;
    item_number!: string;
    item_description!: string;
    item_status!: string;
    remarks!: string;
}