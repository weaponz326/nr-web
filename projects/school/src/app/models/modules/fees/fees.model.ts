export class Fees {
  account!: string;
  term!: string;
  fees_code!: string;
  fees_name!: string;
  fees_description!: string;
  fees_date!: Date;
}

export class FeesTarget {
  fees!: string;
  clase!: string;
}

export class FeesItem {
  fees!: string;
  item_number!: string;
  item_name!: string;
  amount!: string;
}

export class ArrearsItem {
  fees!: string;
  item_number!: string;
  item_name!: string;
  source!: string;
}

export class Bill {
  fees!: string;
  student!: string;
  amount!: string;
}
