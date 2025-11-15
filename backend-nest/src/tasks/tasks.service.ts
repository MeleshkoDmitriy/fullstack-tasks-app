import { Injectable } from '@nestjs/common';
import { EnumTaskStatus, ITask } from './tasks.model';
import { tasksDatabase } from './tasks.database';
import { CreateTaskDto } from './dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [...tasksDatabase];

  findAllTasks(): ITask[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, category, description, priority } = createTaskDto;

    const date = new Date();

    const task: ITask = {
      id: uuid(),
      title,
      description,
      category,
      priority,
      status: EnumTaskStatus.TODO,
      createdAt: date,
      updatedAt: date,
      isBlocked: false,
    };

    this.tasks.push(task);
    return task;
  }
}
