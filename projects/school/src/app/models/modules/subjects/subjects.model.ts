export class Subject {
  account!: string;
  department!: string;
  subject_code!: string;
  subject_name!: string;
  description!: string;
}

export class SubjectTeacher {
  subject!: string;
  teacher!: string;
}
