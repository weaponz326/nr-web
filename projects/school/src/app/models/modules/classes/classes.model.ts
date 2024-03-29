export class Clase {
  account!: string;
  class_teacher!: string;
  department!: string;
  terms!: any;
  class_name!: string;
  class_abbreviation!: string;
  grade!: string;
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
  department_name!: string;
  department_description!: string;
}

export class DepartmentClass {
  account!: string;
  department!: string;
  clase!: string;
}