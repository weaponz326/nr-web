export class MenuGroup {
  account!: string;
  menu_group!: string;
  category!: string;
}

export class MenuItem {
  menu_group!: string;
  item_code!: string;
  item_name!: string;
  price!: number;
  image!: any;
  description!: string;
}

export class MenuItemCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}