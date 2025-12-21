import { FlatList, Text, View } from 'react-native';
import { ScreenWrapper, TaskCard, UIText } from '@/components';
import { useTasks } from '@/hooks';

export const TasksListScreen = () => {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return (
      <ScreenWrapper>
        <UIText text='Loading....' />
      </ScreenWrapper>
    );
  }


  return (
    <ScreenWrapper>
      <UIText text='TasksListScreenTasksListScreen' weight='bold' />
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => <TaskCard task={item} />}
      />
    </ScreenWrapper>
  );
};
