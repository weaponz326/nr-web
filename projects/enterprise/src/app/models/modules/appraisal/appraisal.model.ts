export class Appraisal {
    account!: string;
    employee!: string;
    appraisal_code!: string;
    appraisal_name!: string;
    start_date!: Date;
    end_date!: Date;
    supervisor!: string;
}

export class AppraisalSheet {
    knowledge!: number;
    quality!: number;
    productivity!: number;
    dependability!: number;
    attendance!: number;
}