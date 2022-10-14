export class Assessment {
  account!: string;
  term!: string;
  subject!: string;
  assessment_code!: string;
  assessment_name!: string;
  assessment_date!: Date;
}

export class AssessmentClass {
  assessment!: string;
  clase!: string;
}

export class AssessmentSheet {
  sheet!: any;
}
