export class Budget {
  user!: string;
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

export class BudgetCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
