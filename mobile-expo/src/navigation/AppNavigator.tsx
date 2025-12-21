import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './BottomTabsNavigator';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};
