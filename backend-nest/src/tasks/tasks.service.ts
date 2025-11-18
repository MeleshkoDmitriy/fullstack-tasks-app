import { Injectable, NotFoundException } from '@nestjs/common';
import { EnumTaskStatus, ITask } from './tasks.model';
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

    if (filterDto.search) {
      const lowerCaseSearchString = filterDto.search.toLowerCase();

      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(lowerCaseSearchString) ||
          t.description.toLowerCase().includes(lowerCaseSearchString) ||
          t.category.toLowerCase().includes(lowerCaseSearchString),
      );
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
      category: createTaskDto.category,
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
    foundTask.category = updateTaskDto.category ?? foundTask.category;
    foundTask.priority = updateTaskDto.priority ?? foundTask.priority;
    foundTask.status = updateTaskDto.status ?? foundTask.status;
    foundTask.isBlocked = updateTaskDto.isBlocked ?? foundTask.isBlocked;

    return foundTask;
  }

  deleteTask(id: string): void {
    const foundTask = this.tasks.find((task: ITask) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks = this.tasks.filter((t: ITask) => t.id !== id);
  }
}
