export class Term {
  account!: string;
  term_code!: string;
  term_name!: string;
  academic_year!: string;
  start_date!: Date;
  end_date!: Date;
  term_status!: string;
}

export class ActiveTerm {
  id!: string;
  term!: string;
}
