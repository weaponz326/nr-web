export class TaskGroup {
  user!: string;
  task_group!: string;
}

export class TaskItem {
  task_group!: any;
  task_item!: string;
  description!: string;
  priority!: string;
  start_date!: Date;
  end_date!: Date;
  status!: string;
}
