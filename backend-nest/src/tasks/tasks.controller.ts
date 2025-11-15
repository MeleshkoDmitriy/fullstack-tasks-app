import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): ITask[] {
    return this.tasksService.findAllTasks();
  }
}
