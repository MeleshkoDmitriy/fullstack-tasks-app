import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CreateTaskScreen, EditTaskScreen, TasksListScreen } from '../screens';

export type TasksStackParamList = {
  TasksList: undefined;
  CreateTask: undefined;
  EditTask: { taskId: string };
};

const Stack = createNativeStackNavigator<TasksStackParamList>();

export const TasksStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='TasksList'
        component={TasksListScreen}
        options={{
          title: 'My Tasks List',
          headerRight: () => (
            <Ionicons
              name='add-circle'
              size={30}
              color='#000'
              onPress={() => {}}
            />
          ),
        }}
      />
      <Stack.Screen
        name='CreateTask'
        component={CreateTaskScreen}
        options={{
          title: 'Create New Task',
        }}
      />
      <Stack.Screen
        name='EditTask'
        component={EditTaskScreen}
        options={{
          title: 'Edit This Task',
        }}
      />
    </Stack.Navigator>
  );
};
