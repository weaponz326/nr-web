export class Drug {
    account!: string;
    ndc_number!: string;
    drug_name!: string;
    generic_name!: string;
    manufacturer!: string;
    drug_type!: string;
    unit_dose!: string;
    category!: string;
    unit_price!: number;
    batch_number!: string;
    purchased_date!: Date;
    initial_quantity!: number;
    dispensed_quantity!: number;
    remaining_quantity!: number;
    manufacturing_date!: Date;
    expiry_date!: Date;
    storage_location!: string;
    storage_bin!: string;
    refill_ordered!: number;
}
