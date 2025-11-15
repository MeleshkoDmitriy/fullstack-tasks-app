export const enum EnumTaskStatus {
  TODO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export const enum EnumTaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: EnumTaskPriority;
  status: EnumTaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
