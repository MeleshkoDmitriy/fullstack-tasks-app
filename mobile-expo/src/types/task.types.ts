export const enum EnumTaskTag {
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

export const enum EnumTaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export const enum EnumTaskStatus {
  TODO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export type TTask = {
  id: string;
  title: string;
  description: string;
  tags: EnumTaskTag[];
  priority: EnumTaskPriority;
  status: EnumTaskStatus;
  isBlocked: boolean;
  createdAt: string;
  updateAt: string;
};

export type TIdTask = TTask['id'];

export type CreateTaskPayload = Pick<
  TTask,
  'title' | 'description' | 'tags' | 'priority'
>;

export type UpdateTaskPayload = Partial<
  Pick<
    TTask,
    'title' | 'description' | 'tags' | 'priority' | 'status' | 'isBlocked'
  >
>;

export type TGetTasksFilters = {
  search?: string;
  status?: EnumTaskStatus;
  priority?: EnumTaskPriority;
  tags?: EnumTaskTag[];
  isBlocked?: boolean;
};
