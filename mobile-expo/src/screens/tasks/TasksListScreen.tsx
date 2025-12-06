import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TTask } from '../../types';
import { apiConfig } from '../../services/api/apiConfig';

export const TasksListScreen = () => {
  const [tasks, setTasks] = useState<TTask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiConfig.get<TTask[]>('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.log('Error fetching', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <View>
      <Text>TasksListScreen</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.status}</Text>
          </View>
        )}
        keyExtractor={(tasks) => tasks.id}
      />
    </View>
  );
};
