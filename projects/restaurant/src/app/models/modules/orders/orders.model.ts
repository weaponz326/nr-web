export class Order {
  account!: string;
  table!: string;
  customer!: string;
  customer_name!: string;
  order_code!: string;
  order_date!: string;
  order_type!: string;
  order_status!: string;
  total_amount!: number;
}

export class OrderItem {
  item_number!: number;
  menu_item!: string;
  order!: string;
  quantity!: number;
}

export class OrderCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
