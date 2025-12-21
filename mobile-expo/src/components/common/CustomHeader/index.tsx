import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CustomHeaderButton,
  TCustomHeaderButton,
} from './ui/CustomHeaderButton';
import { UIText } from '../UIComponents';
import { useTheme } from '@/hooks';

interface CustomHeaderProps {
  title?: string;
  leftButton?: TCustomHeaderButton;
  rightButton?: TCustomHeaderButton;
}

export const CustomHeader = ({
  title,
  leftButton,
  rightButton,
}: CustomHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: theme.colors.base.primaryLight,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          height: 44,
        }}
      >
        <View style={{ width: 40, alignItems: 'flex-start' }}>
          {leftButton && <CustomHeaderButton {...leftButton} />}
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          {title && <UIText text={title} weight='bold' size='lg' />}
        </View>

        <View style={{ width: 40, alignItems: 'flex-end' }}>
          {rightButton && <CustomHeaderButton {...rightButton} />}
        </View>
      </View>
    </View>
  );
};
