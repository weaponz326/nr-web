export class Ledger {
    account!: string;
    ledger_code!: string;
    ledger_name!:  string;
    from_date!: Date;
    to_date!: Date;
}

export class LedgerItem {
    ledger!: string;
    item_date!: Date;
    reference_number!: string;
    description!: string;
    item_type!: string;
    amount!: number;
}
