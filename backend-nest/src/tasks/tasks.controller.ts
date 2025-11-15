import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): ITask[] {
    return this.tasksService.findAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.findOne(id);
  }

  @Post()
  postTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  @HttpCode(204) // 204 No Content
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
