export enum EnumTaskTag {
  WORK = 'work',
  HOME = 'home',
  PERSONAL = 'personal',
  HEALTH = 'health',
  SHOPPING = 'shopping',
  FINANCE = 'finance',
  EDUCATION = 'education',
  FAMILY = 'family',
  SOCIAL = 'social',
  TRAVEL = 'travel',
  FOOD = 'food',
  CAR = 'car',
  PET = 'pet',
  HOBBY = 'hobby',
  SPORT = 'sport',
}

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
  priority: EnumTaskPriority;
  status: EnumTaskStatus;
  tags: EnumTaskTag[];
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
