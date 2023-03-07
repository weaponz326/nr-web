export class TaskGroup {
  user!: string;
  task_group!: string;
}

export class TaskItem {
  task_group!: string;
  task_item!: string;
  description!: string;
  priority!: string;
  status!: string;
}

export class TaskGroupCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}

export class TaskItemCodeConfig {
  entry_mode!: string;
  prefix!: string;
  last_code!: string;
  suffix!: string;
}
