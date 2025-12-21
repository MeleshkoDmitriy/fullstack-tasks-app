import { EnumTaskStatus, Theme } from '@/types';

export const getTaskStatusIcon = (status: EnumTaskStatus, theme: Theme) => {
  switch (status) {
    case EnumTaskStatus.TODO:
      return {
        name: 'progress-one',
        color: theme.colors.status.todo,
      };
    case EnumTaskStatus.IN_PROGRESS:
      return {
        name: 'progress-two',
        color: theme.colors.status.inProgress,
      };
    case EnumTaskStatus.DONE:
      return {
        name: 'progress-full',
        color: theme.colors.status.done,
      };
    default:
      return {
        name: 'progress-one',
        color: theme.colors.status.inProgress,
      };
  }
};
