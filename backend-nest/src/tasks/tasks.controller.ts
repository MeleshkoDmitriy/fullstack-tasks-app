import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): ITask[] {
    return this.tasksService.findAllTasks();
  }

  @Post()
  postTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }
}
