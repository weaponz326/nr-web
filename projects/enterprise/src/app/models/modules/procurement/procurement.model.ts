export class Procurement {
    procurement_code!: string;
    order_code!: string;
    order_type!: string;
    order_date!: Date;
    description!: string;
    project!: string;
    procurement_status!: string;
    vendor!: string;
    vendor_phone!: string;
    vendor_email!: string;
    vendor_address!: string;
}

export class OrderReview {
    issued_date!: Date;
    issued_by!: string;
    received_date!: Date;
    received_by!: string;
    approved_date!: Date;
    approved_by!: string;
    acknowledged_date!: Date;
    acknowledged_by!: string;
    completed_date!: Date;
    completed_by!: string;
}