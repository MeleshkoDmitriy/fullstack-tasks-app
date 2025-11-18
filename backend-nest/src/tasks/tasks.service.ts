import { Injectable, NotFoundException } from '@nestjs/common';
import { EnumTaskStatus, EnumTaskTag, ITask } from './tasks.model';
import { tasksDatabase } from './tasks.database';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto, CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [...tasksDatabase];

  findAllTasks(filterDto: GetTasksFilterDto): ITask[] {
    let tasks = this.tasks;

    if (filterDto.isBlocked !== undefined) {
      tasks = tasks.filter((t) => t.isBlocked === filterDto.isBlocked);
    }

    if (filterDto.priority) {
      tasks = tasks.filter((t) => t.priority === filterDto.priority);
    }

    if (filterDto.status) {
      tasks = tasks.filter((t) => t.status === filterDto.status);
    }

    if (filterDto.tags && filterDto.tags.length > 0) {
      const filterTags = filterDto.tags;
      tasks = tasks.filter((t) =>
        filterTags.some((filterTag: EnumTaskTag) => t.tags.includes(filterTag)),
      );
    }

    if (filterDto.search) {
      const searchWords = filterDto.search
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      if (searchWords.length > 0) {
        tasks = tasks.filter((t) => {
          const titleLower = t.title.toLowerCase();
          const descriptionLower = t.description.toLowerCase();
          const searchText = `${titleLower} ${descriptionLower}`;

          return searchWords.every((word) => searchText.includes(word));
        });
      }
    }

    return tasks;
  }

  findOneTask(id: string): ITask {
    const foundTask = this.tasks.find((task: ITask) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const date = new Date();

    const task: ITask = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      tags: createTaskDto.tags,
      priority: createTaskDto.priority,
      status: EnumTaskStatus.TODO,
      createdAt: date,
      updatedAt: date,
      isBlocked: false,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): ITask {
    const foundTask = this.findOneTask(id);

    foundTask.updatedAt = new Date();

    foundTask.title = updateTaskDto.title ?? foundTask.title;
    foundTask.description = updateTaskDto.description ?? foundTask.description;
    foundTask.tags = updateTaskDto.tags ?? foundTask.tags;
    foundTask.priority = updateTaskDto.priority ?? foundTask.priority;
    foundTask.status = updateTaskDto.status ?? foundTask.status;
    foundTask.isBlocked = updateTaskDto.isBlocked ?? foundTask.isBlocked;

    return foundTask;
  }

  toggleTaskBlocked(id: string): ITask {
    const foundTask = this.findOneTask(id);

    foundTask.isBlocked = !foundTask.isBlocked;
    foundTask.updatedAt = new Date();

    return foundTask;
  }

  deleteTask(id: string): void {
    this.findOneTask(id);
    this.tasks = this.tasks.filter((t: ITask) => t.id !== id);
  }
}
