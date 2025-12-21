import { useTheme } from '@/hooks';
import { Octicons } from '@expo/vector-icons';
import { FC } from 'react';
import { View } from 'react-native';

interface TaskBlockedProps {}

export const TaskBlocked: FC<TaskBlockedProps> = ({}) => {
  const { theme } = useTheme();

  return (
    <View>
      <Octicons name='blocked' size={24} color={theme.colors.priority.high} />
    </View>
  );
};
