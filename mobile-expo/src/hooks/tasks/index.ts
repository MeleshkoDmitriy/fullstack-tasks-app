import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateTaskPayload,
  TGetTasksFilters,
  TIdTask,
  TTask,
  UpdateTaskPayload,
} from '@/types';
import { tasksApi } from '@/services';
import { CONSTANTS } from '@/constants';

export const tasksKeysConfig = {
  all: ['tasks'],
  lists: () => [...tasksKeysConfig.all, 'list'],
  list: (filters?: TGetTasksFilters) => [...tasksKeysConfig.lists(), filters],
  details: () => [...tasksKeysConfig.all, 'detail'],
  detail: (id: TIdTask) => [...tasksKeysConfig.details(), id],
};

export const useTasks = (filters?: TGetTasksFilters) => {
  return useQuery<TTask[]>({
    queryKey: tasksKeysConfig.list(filters),
    queryFn: () => tasksApi.getTasks(filters),
    staleTime: CONSTANTS.DEFAULT_STALE_TIME,
  });
};

export const useTask = (id: TIdTask) => {
  return useQuery<TTask>({
    queryKey: tasksKeysConfig.detail(id),
    queryFn: () => tasksApi.getTaskById(id),
    enabled: !!id, // only with id
    staleTime: CONSTANTS.DEFAULT_STALE_TIME,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TTask, Error, CreateTaskPayload>({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeysConfig.lists() });
    },
    onError: (error) => {
      console.error('Failed to create task:', error);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TTask,
    Error,
    {
      id: TIdTask;
      payload: UpdateTaskPayload;
    }
  >({
    mutationFn: ({ id, payload }) => tasksApi.updateTask(id, payload),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(tasksKeysConfig.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: tasksKeysConfig.lists() });
    },
    onError: (error) => {
      console.error('Failed to update task:', error);
    },
  });
};

export const useToggleTaskBlocked = () => {
  const queryClient = useQueryClient();

  return useMutation<TTask, Error, TIdTask>({
    mutationFn: tasksApi.toggleBlockedTask,
    onSuccess: (data, taskId) => {
      queryClient.setQueryData(tasksKeysConfig.detail(taskId), data);
      queryClient.invalidateQueries({ queryKey: tasksKeysConfig.lists() });
    },
    onError: (error) => {
      console.error('Failed to toggle task blocked status:', error);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, TIdTask>({
    mutationFn: tasksApi.deleteTask,
    onSuccess: (_, taskId) => {
      queryClient.removeQueries({ queryKey: tasksKeysConfig.detail(taskId) });
      queryClient.invalidateQueries({ queryKey: tasksKeysConfig.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete task:', error);
    },
  });
};
