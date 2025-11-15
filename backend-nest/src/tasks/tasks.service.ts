import { UpdateTaskDto } from './dto/update-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EnumTaskStatus, ITask } from './tasks.model';
import { tasksDatabase } from './tasks.database';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [...tasksDatabase];

  findAllTasks(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask {
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
    const foundTask = this.tasks.find((t: ITask) => t.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

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
