export class Procurement {
    procurementCode!: string;
    orderCode!: string;
    orderType!: string;
    orderDate!: Date;
    description!: string;
    project!: string;
    procurementStatus!: string;
    vendor!: string;
    vendorPhone!: string;
    vendorEmail!: string;
    vendorAddress!: string;
}

export class OrderReview {
    issuedDate!: Date;
    issuedBy!: string;
    receivedDate!: Date;
    receivedBy!: string;
    approvedDate!: Date;
    approvedBy!: string;
    acknowledgedDate!: Date;
    acknowledgedBy!: string;
    completedDate!: Date;
    completedBy!: string;
}