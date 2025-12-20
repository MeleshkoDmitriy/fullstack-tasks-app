import { FlatList, Text, View } from "react-native";
import { ScreenWrapper } from "@/components";
import { useTasks } from "@/hooks";

export const TasksListScreen = () => {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <ScreenWrapper>
        <Text>Loading....</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <Text>TasksListScreenTasksListScreen</Text>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </ScreenWrapper>
  );
};
