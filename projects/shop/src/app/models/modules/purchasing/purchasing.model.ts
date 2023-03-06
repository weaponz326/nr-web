export class Purchasing {
    account!: string;
    supplier!: string;
    purchasing_code!: string;
    purchasing_date!: Date;
    invoice_number!: string;
    total_amount!: number;
    status!: string;
}

export class PurchasingItem {
    purchasing!: string;
    item_number!: number;
    quantity!: number;
    product!: string;
}