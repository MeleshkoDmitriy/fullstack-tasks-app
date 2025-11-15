export enum EnumTaskStatus {
  TODO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum EnumTaskPriority {
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
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
