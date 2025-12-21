import { ScreenWrapper, UISwitcher, UIText } from '@/components';
import { useTheme } from '@/hooks';

export const SettingsListScreen = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <ScreenWrapper>
      <UIText text='SettingsListScreen' />
      <UISwitcher value={isDarkTheme} onValueChange={toggleTheme} />
    </ScreenWrapper>
  );
};
