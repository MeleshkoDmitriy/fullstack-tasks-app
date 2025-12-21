import { useTheme } from '@/hooks';
import { Switch, SwitchProps } from 'react-native';

interface UISwitcherProps extends SwitchProps {}

export const UISwitcher = (props: UISwitcherProps) => {
  const { theme } = useTheme();

  return (
    <Switch
      {...props}
      thumbColor={theme.colors.base.primary}
      trackColor={{
        true: theme.colors.base.primaryDark,
        false: theme.colors.base.primaryLight,
      }}
    />
  );
};
