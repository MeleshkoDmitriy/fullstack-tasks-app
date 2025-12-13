import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TasksStackNavigator } from './TasksStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';

export type BottomTabsParamList = {
  TasksStack: undefined;
  SettingsStack: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
