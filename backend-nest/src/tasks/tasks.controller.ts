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
      'Retrieve all tasks with optional filtering by status, priority, tags, blocked status, and search query. Search works only in title and description (not in tags). Tags must be valid enum values.',
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
  @ApiQuery({
    name: 'tags',
    required: false,
    type: String,
    description:
      'Comma-separated tags for filtering (e.g., work,education). Valid tags: work, home, personal, health, shopping, finance, education, family, social, travel, food, car, pet, hobby, sport. Invalid tags will return 400 error.',
    example: 'work,education',
  })
  @ApiQuery({ name: 'isBlocked', required: false, type: Boolean })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description:
      'Search query to find tasks by title or description. Supports multiple words (AND logic - all words must be present). Case-insensitive.',
    example: 'project documentation',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of tasks retrieved successfully',
    type: [TaskResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid tags provided',
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
      'Create a new task with title, description, tags, and priority',
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

  @Patch('/:id/toggle-blocked')
  @ApiOperation({
    summary: 'Toggle task blocked status',
    description:
      'Toggle the blocked status of a task by ID. No request body required.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task blocked status toggled successfully',
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
  toggleTaskById(@Param('id') id: string): ITask {
    return this.tasksService.toggleTaskBlocked(id);
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
