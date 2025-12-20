import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateTaskScreen, EditTaskScreen, TasksListScreen } from '../screens';
import { CustomHeader } from '../components';

export type TasksStackParamList = {
  TasksList: undefined;
  CreateTask: undefined;
  EditTask: { taskId: string };
};

const Stack = createNativeStackNavigator<TasksStackParamList>();

export const TasksStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name='TasksList'
        component={TasksListScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="My Tasks List"
              rightButton={{
                name: "add-circle",
                size: 30,
                onPress: () => navigation.navigate("CreateTask"),
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name='CreateTask'
        component={CreateTaskScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Create New Task"
              leftButton={{
                name: "arrow-back",
                size: 24,
                onPress: () => navigation.goBack(),
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name='EditTask'
        component={EditTaskScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Edit Task"
              leftButton={{
                name: "close",
                size: 24,
                onPress: () => navigation.goBack(),
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
