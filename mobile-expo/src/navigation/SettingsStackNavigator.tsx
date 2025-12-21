import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsListScreen } from '@/screens';
import { CustomHeader } from '@/components';

export type SettingsStackParamList = {
  SettingList: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name='SettingList'
        component={SettingsListScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Setting List"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
