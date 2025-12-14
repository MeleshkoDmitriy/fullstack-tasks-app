import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CustomHeaderButton,
  TCustomHeaderButton,
} from './ui/CustomHeaderButton';

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

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: '#a3a3a3',
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
          <Text style={{ fontSize: 17, fontWeight: '600' }}>{title}</Text>
        </View>

        <View style={{ width: 40, alignItems: 'flex-end' }}>
          {rightButton && <CustomHeaderButton {...rightButton} />}
        </View>
      </View>
    </View>
  );
};
