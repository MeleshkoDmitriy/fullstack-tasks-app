import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import type { ITask } from './tasks.model';
import {
  GetTasksFilterDto,
  UpdateTaskDto,
  CreateTaskDto,
  TaskResponseDto,
} from './dto';
import { AuthGuard } from '../common';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description:
      'Retrieve all tasks with optional filtering by status, priority, blocked status, and search query',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['to-do', 'in-progress', 'done'],
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: ['low', 'medium', 'high'],
  })
  @ApiQuery({ name: 'isBlocked', required: false, type: Boolean })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of tasks retrieved successfully',
    type: [TaskResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getAllTasksByFiltersAndSearch(
    @Query() filterDto: GetTasksFilterDto,
  ): ITask[] {
    return this.tasksService.findAllTasks(filterDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Retrieve a single task by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task retrieved successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.findOneTask(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Create a new task with title, description, category, and priority',
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  postTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Update an existing task by ID. All fields are optional.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task updated successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Delete a task by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
