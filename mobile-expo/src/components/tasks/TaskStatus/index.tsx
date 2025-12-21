import { UIText } from '@/components/common';
import { spacing } from '@/styles';
import { EnumTaskStatus } from '@/types';
import { capitalizeString } from '@/utils';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { getTaskStatusIcon } from './utils';
import { useTheme } from '@/hooks';
import { Entypo } from '@expo/vector-icons';

interface TaskStatusProps {
  status: EnumTaskStatus;
  isLabelShown?: boolean;
}

export const TaskStatus: FC<TaskStatusProps> = ({ status, isLabelShown = true }) => {
  const { theme } = useTheme();
  const { name, color } = getTaskStatusIcon(status, theme);

  return (
    <View style={styles.container}>
      <Entypo name={name} size={24} color={color} />
      {isLabelShown && <UIText text={capitalizeString(status)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
