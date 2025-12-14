import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];
export type TCustomHeaderButton = {
  name: IoniconsName;
  onPress?: () => void;
  size?: number;
  color?: string;
};

interface CustomHeaderButtonProps extends TCustomHeaderButton {}

export const CustomHeaderButton = ({
  name,
  onPress = () => {},
  size = 30,
  color = '#000',
}: CustomHeaderButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
