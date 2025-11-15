import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask } from './tasks.model';
import { GetTasksFilterDto, UpdateTaskDto, CreateTaskDto } from './dto';
import { AuthGuard } from '../common';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasksByFiltersAndSearch(
    @Query() filterDto: GetTasksFilterDto,
  ): ITask[] {
    return this.tasksService.findAllTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.findOneTask(id);
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
