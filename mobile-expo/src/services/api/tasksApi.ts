import {
  CreateTaskPayload,
  TGetTasksFilters,
  TIdTask,
  TTask,
  UpdateTaskPayload,
} from "@/types";
import { apiClient } from "./apiClient";

const TASKS_ROUTE = "/tasks";

const buildQueryParams = (
  filters?: TGetTasksFilters
): Record<string, string | boolean> => {
  if (!filters) return {};

  const params: Record<string, string | boolean> = {};

  if (filters.status) {
    params.status = filters.status;
  }

  if (filters.priority) {
    params.priority = filters.priority;
  }

  if (filters.tags && filters.tags.length > 0) {
    params.tags = filters.tags.join(",");
  }

  if (
    filters.isBlocked !== undefined &&
    typeof filters.isBlocked === "boolean"
  ) {
    params.isBlocked = filters.isBlocked;
  }

  if (filters.search && filters.search.trim().length > 0) {
    params.search = filters.search.trim();
  }

  return params;
};

export const tasksApi = {
  getTasks: async (filters?: TGetTasksFilters): Promise<TTask[]> => {
    const params = buildQueryParams(filters);
    const response = await apiClient.get<TTask[]>(`${TASKS_ROUTE}`, { params });

    return response.data;
  },

  getTaskById: async (id: TIdTask): Promise<TTask> => {
    const response = await apiClient.get<TTask>(`${TASKS_ROUTE}/${id}`);

    return response.data;
  },

  createTask: async (payload: CreateTaskPayload): Promise<TTask> => {
    const response = await apiClient.post<TTask>(`${TASKS_ROUTE}`, payload);

    return response.data;
  },

  updateTask: async (
    id: TIdTask,
    payload: UpdateTaskPayload
  ): Promise<TTask> => {
    const response = await apiClient.patch<TTask>(
      `${TASKS_ROUTE}/${id}`,
      payload
    );

    return response.data;
  },

  toggleBlockedTask: async (id: TIdTask): Promise<TTask> => {
    const response = await apiClient.patch<TTask>(
      `${TASKS_ROUTE}/${id}/toggle-blocked`
    );

    return response.data;
  },

  deleteTask: async (id: TIdTask): Promise<void> => {
    await apiClient.delete(`${TASKS_ROUTE}/${id}`);
  },
};
