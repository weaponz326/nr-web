export class Subject {
  created_at!: any;
  account!: string;
  terms!: any;
  department!: string;
  subject_code!: string;
  subject_name!: string;
  description!: string;
}

export class SubjectTeacher {
  subject!: string;
  teacher!: string;
}
