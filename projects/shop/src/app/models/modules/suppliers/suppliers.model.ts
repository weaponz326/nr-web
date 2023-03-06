export class Supplier {
    account!: string;
    supplier_code!: string;
    supplier_name!: string;
    supplier_type!: string;
    phone!: string;
    email!: string;
    address!: string;
    state!: string;
    city!: string;
}

export class SupplierProduct {
    supplier!: string;
    product!: string;
}