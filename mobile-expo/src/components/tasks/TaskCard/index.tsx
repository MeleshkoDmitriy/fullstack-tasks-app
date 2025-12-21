import { FC } from 'react';
import { UIBox, UIText } from '../../common';
import { TTask } from '@/types';

interface TaskCardProps {
  task: TTask;
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { title, priority, status, isBlocked } = task;

  return (
    <UIBox>
      <UIText text={title} />
    </UIBox>
  );
};
