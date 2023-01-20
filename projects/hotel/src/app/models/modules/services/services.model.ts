export class Service {
    account!: string;
    guest!: string;
    service_code!: string;
    service_name!: string;
    service_type!: string;
    service_total!: number;
}

export class ServiceItem {
    service!: string;
    item_number!: number;
    item_date!: Date;
    description!: string;
    amount!: number;
}