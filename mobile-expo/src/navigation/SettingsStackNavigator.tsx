import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsListScreen } from '../screens';

export type SettingsStackParamList = {
  SettingList: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SettingList'
        component={SettingsListScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};
