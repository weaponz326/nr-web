export class Ledger {
    ledgerCode!: string;
    ledgerName!:  string;
    fromDate!: Date;
    toDate!: Date;
}

export class LedgerItem {
    itemDate!: Date;
    referenceNumber!: string;
    description!: string;
    itemType!: string;
    amount!: string;
}
