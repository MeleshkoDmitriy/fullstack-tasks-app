import { EnumTaskPriority, Theme } from '@/types';

export const getTaskPriorityIcon = (
  priority: EnumTaskPriority,
  theme: Theme
) => {
  switch (priority) {
    case EnumTaskPriority.HIGH:
      return {
        name: 'angle-double-up',
        color: theme.colors.priority.high,
      };
    case EnumTaskPriority.MEDIUM:
      return {
        name: 'angle-up',
        color: theme.colors.priority.medium,
      };
    case EnumTaskPriority.LOW:
      return {
        name: 'angle-down',
        color: theme.colors.priority.low,
      };
    default:
      return {
        name: 'question',
        color: theme.colors.priority.medium,
      };
  }
};
