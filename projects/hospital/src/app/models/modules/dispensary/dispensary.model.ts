export class Dispense {
    account!: string;
    admission!: string;
    dispense_code!: string;
    dispense_date!: Date;
}

export class DispenseItem {
    item_number!: number;
    drug!: string;
    dispense!: string;
    quantity!: number;
    remarks!: string;
}