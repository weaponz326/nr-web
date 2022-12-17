export class Budget {
    account!: string;
    budget_name!: string;
    budget_type!: string;
}

export class Income {
    budget!: string;
    item_number!: string;
    item_description!: string;
    amount!: number;
}

export class Expenditure {
    budget!: string;
    item_number!: string;
    item_description!: string;
    amount!: number;
}
  