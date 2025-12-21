import { FC } from 'react';
import { UIBox, UIText } from '../../common';
import { TTask } from '@/types';
import { TaskPriority } from '../TaskPriority';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/styles';
import { TaskStatus } from '../TaskStatus';
import { TaskBlocked } from '../TaskBlocked';

interface TaskCardProps {
  task: TTask;
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { title, priority, status, isBlocked } = task;

  return (
    <UIBox>
      <UIText text={title} />
      <View style={styles.states}>
        <TaskPriority priority={priority} isLabelShown />
        <TaskStatus status={status} isLabelShown />
        {isBlocked && <TaskBlocked />}
      </View>
    </UIBox>
  );
};

const styles = StyleSheet.create({
  container: {},
  states: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
});
