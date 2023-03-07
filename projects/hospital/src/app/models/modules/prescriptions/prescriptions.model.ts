export class Prescription {
    account!: string;
    admission!: string;
    prescription_code!: string;
    prescription_date!: Date;
    consultant_name!: string;
}

export class PrescriptionItem {
    item_number!: number;
    prescription!: string;
    medicine!: string;
    dosage!: string;
    remarks!: string;
}