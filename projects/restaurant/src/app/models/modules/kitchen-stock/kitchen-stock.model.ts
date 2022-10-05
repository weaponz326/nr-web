export class StockItem {
  account!: string;
  item_code!: string;
  item_name!: string;
  category!: string;
  item_type!: string;
  quantity!: number;
  refill_ordered!: number;
}

export class StockItemCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
