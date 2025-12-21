import { EnumTaskPriority } from '@/types';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { getTaskPriorityIcon } from './utils';
import { useTheme } from '@/hooks';
import { UIText } from '@/components/common';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { spacing } from '@/styles';
import { capitalizeString } from '@/utils';

interface TaskPriorityProps {
  priority: EnumTaskPriority;
  isLabelShown?: boolean;
}

export const TaskPriority: FC<TaskPriorityProps> = ({
  priority,
  isLabelShown = true,
}) => {
  const { theme } = useTheme();
  const { name, color } = getTaskPriorityIcon(priority, theme);

  return (
    <View style={styles.container}>
      <FontAwesome5 name={name} size={24} color={color} />
      {isLabelShown && <UIText text={capitalizeString(priority)} />}
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
