import {
  CreateTaskPayload,
  TGetTasksFilters,
  TTask,
  UpdateTaskPayload,
} from '../../types';
import { apiClient } from './apiClient';

const TASKS_ROUTE = '/tasks';

const buildQueryParams = (filters?: TGetTasksFilters) => {
  if (!filters) return {};

  const params = {};

  return params;
};

export const tasksApi = {
  getTasks: async (filters?: TGetTasksFilters): Promise<TTask[]> => {
    const params = buildQueryParams(filters);
    const response = await apiClient.get<TTask[]>(`${TASKS_ROUTE}`, { params });

    return response.data;
  },

  getTaskById: async (id: TTask['id']): Promise<TTask> => {
    const response = await apiClient.get<TTask>(`${TASKS_ROUTE}/${id}`);

    return response.data;
  },

  createTask: async (payload: CreateTaskPayload): Promise<TTask> => {
    const response = await apiClient.post<TTask>(`${TASKS_ROUTE}`, payload);

    return response.data;
  },

  updateTask: async (
    id: TTask['id'],
    payload: UpdateTaskPayload
  ): Promise<TTask> => {
    const response = await apiClient.patch<TTask>(
      `${TASKS_ROUTE}/${id}`,
      payload
    );

    return response.data;
  },

  toggleBlockedTask: async (id: TTask['id']): Promise<TTask> => {
    const response = await apiClient.patch<TTask>(
      `${TASKS_ROUTE}/${id}/toggle-blocked`
    );

    return response.data;
  },

  deleteTask: async (id: TTask['id']): Promise<void> => {
    await apiClient.delete(`${TASKS_ROUTE}/${id}`);
  },
};
