import { Injectable } from '@nestjs/common';
import { ITask } from './tasks.model';
import { tasksDatabase } from './tasks.database';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [...tasksDatabase];

  findAllTasks(): ITask[] {
    return this.tasks;
  }

  // createTask()
}
