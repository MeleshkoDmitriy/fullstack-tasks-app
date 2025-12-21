import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TasksStackNavigator } from './TasksStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';
import { useTheme } from '@/hooks';

export type BottomTabsParamList = {
  TasksStack: undefined;
  SettingsStack: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabsNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.base.primaryLight,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: theme.colors.base.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
      }}
    >
      <Tab.Screen
        name='TasksStack'
        component={TasksStackNavigator}
        options={{
          title: 'Tasks',
        }}
      />
      <Tab.Screen
        name='SettingsStack'
        component={SettingsStackNavigator}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
