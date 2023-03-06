export class Order {
    account!: string;
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
    product!: string;
    order!: string;
    quantity!: number;
}
  