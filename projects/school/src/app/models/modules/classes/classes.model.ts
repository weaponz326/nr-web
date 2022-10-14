export class Clase {
  account!: string;
  class_teacher!: string;
  department!: string;
  terms!: any;
  class_code!: string;
  class_name!: string;
  location!: string;
}

export class ClassStudent {
  clase!: string;
  student!: string;
}

export class Department {
  account!: string;
  terms!: any;
  department_head!: string;
  department_code!: string;
  department_name!: string;
  department_description!: string;
}
