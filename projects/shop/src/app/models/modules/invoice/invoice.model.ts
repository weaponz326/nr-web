export class Invoice {
    account!: string;
    customer!: string;
    invoice_number!: string;
    invoice_date!: Date;
    due_date!: Date;
    total_amount!: number;
    invoice_status!: string;
}

export class InvoiceItem {
    invoice!: string;
    item_number!: number;
    quantity!: number;
    product!: string;
}