export class Order {
  account!: string;
  table!: string;
  customer!: string;
  order_code!: string;
  order_date!: string;
  order_type!: string;
  order_status!: string;
  total_amount!: number;
}

export class OrderItem {
  menu_item!: string;
  order!: string;
  quantity!: number;
}
