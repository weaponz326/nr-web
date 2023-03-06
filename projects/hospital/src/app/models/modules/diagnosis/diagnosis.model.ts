export class Diagnosis {
    account!: string;
    patient!: string;
    diagnosis_code!: string;
    diagnosis_date!: Date;
    consultant_name!: string;
}

export class DiagnosisDetails {
    blood_group!: string;
    temperature!: number;
    weight!: number;
    height!: number;
    blood_pressure!: number;
    pulse!: number;
    diagnosis!: string;
    treatment!: string;
    remarks!: string;
}
