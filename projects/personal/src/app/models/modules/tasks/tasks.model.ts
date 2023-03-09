export class TaskGroup {
  user!: string;
  task_group_code!: string;
  task_group!: string;
}

export class TaskItem {
  task_group!: string;
  task_item_code!: string;
  task_item!: string;
  description!: string;
  priority!: string;
  status!: string;
}
