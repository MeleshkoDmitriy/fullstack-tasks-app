import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {
  EnumTaskPriority,
  EnumTaskStatus,
  EnumTaskTag,
  ITask,
} from './tasks.model';
import { CreateTaskDto, UpdateTaskDto, GetTasksFilterDto } from './dto';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    tags: [EnumTaskTag.WORK, EnumTaskTag.EDUCATION],
    priority: EnumTaskPriority.HIGH,
    status: EnumTaskStatus.TODO,
    isBlocked: false,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  const mockTasks: ITask[] = [mockTask];

  const mockTasksService = {
    findAllTasks: jest.fn(),
    findOneTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    toggleTaskBlocked: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTasksByFiltersAndSearch', () => {
    it('should return all tasks when no filters provided', () => {
      const filterDto: GetTasksFilterDto = {};
      mockTasksService.findAllTasks.mockReturnValue(mockTasks);

      const result = controller.getAllTasksByFiltersAndSearch(filterDto);

      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findAllTasks).toHaveBeenCalledWith(filterDto);
      expect(mockTasksService.findAllTasks).toHaveBeenCalledTimes(1);
    });

    it('should return filtered tasks when filters provided', () => {
      const filterDto: GetTasksFilterDto = {
        status: EnumTaskStatus.TODO,
        priority: EnumTaskPriority.HIGH,
      };
      const filteredTasks = [mockTask];
      mockTasksService.findAllTasks.mockReturnValue(filteredTasks);

      const result = controller.getAllTasksByFiltersAndSearch(filterDto);

      expect(result).toEqual(filteredTasks);
      expect(mockTasksService.findAllTasks).toHaveBeenCalledWith(filterDto);
    });

    it('should return filtered tasks by tags', () => {
      const filterDto: GetTasksFilterDto = {
        tags: [EnumTaskTag.WORK],
      };
      const filteredTasks = [mockTask];
      mockTasksService.findAllTasks.mockReturnValue(filteredTasks);

      const result = controller.getAllTasksByFiltersAndSearch(filterDto);

      expect(result).toEqual(filteredTasks);
      expect(mockTasksService.findAllTasks).toHaveBeenCalledWith(filterDto);
    });

    it('should return tasks filtered by search', () => {
      const filterDto: GetTasksFilterDto = { search: 'Test' };
      mockTasksService.findAllTasks.mockReturnValue(mockTasks);

      const result = controller.getAllTasksByFiltersAndSearch(filterDto);

      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findAllTasks).toHaveBeenCalledWith(filterDto);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', () => {
      mockTasksService.findOneTask.mockReturnValue(mockTask);

      const result = controller.getTaskById('1');

      expect(result).toEqual(mockTask);
      expect(mockTasksService.findOneTask).toHaveBeenCalledWith('1');
      expect(mockTasksService.findOneTask).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when task not found', () => {
      mockTasksService.findOneTask.mockImplementation(() => {
        throw new NotFoundException('Task with ID 999 not found');
      });

      expect(() => controller.getTaskById('999')).toThrow(NotFoundException);
      expect(mockTasksService.findOneTask).toHaveBeenCalledWith('999');
    });
  });

  describe('postTask', () => {
    it('should create a new task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
        tags: [EnumTaskTag.WORK],
        priority: EnumTaskPriority.MEDIUM,
      };
      const createdTask: ITask = {
        ...mockTask,
        ...createTaskDto,
        id: '2',
        status: EnumTaskStatus.TODO,
        isBlocked: false,
      };
      mockTasksService.createTask.mockReturnValue(createdTask);

      const result = controller.postTask(createTaskDto);

      expect(result).toEqual(createdTask);
      expect(mockTasksService.createTask).toHaveBeenCalledWith(createTaskDto);
      expect(mockTasksService.createTask).toHaveBeenCalledTimes(1);
    });

    it('should create task with correct DTO data', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Another Task',
        description: 'Another Description',
        tags: [EnumTaskTag.WORK, EnumTaskTag.EDUCATION],
        priority: EnumTaskPriority.LOW,
      };
      mockTasksService.createTask.mockReturnValue({
        ...mockTask,
        ...createTaskDto,
      });

      const result = controller.postTask(createTaskDto);

      expect(result.title).toBe(createTaskDto.title);
      expect(result.description).toBe(createTaskDto.description);
      expect(result.tags).toEqual(createTaskDto.tags);
      expect(result.priority).toBe(createTaskDto.priority);
    });

    it('should create task with empty tags array', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Task without tags',
        description: 'Description',
        tags: [],
        priority: EnumTaskPriority.MEDIUM,
      };
      mockTasksService.createTask.mockReturnValue({
        ...mockTask,
        ...createTaskDto,
      });

      const result = controller.postTask(createTaskDto);

      expect(result.tags).toEqual([]);
    });
  });

  describe('toggleTaskById', () => {
    it('should toggle task blocked status', () => {
      const toggledTask: ITask = {
        ...mockTask,
        isBlocked: true,
        updatedAt: new Date(),
      };
      mockTasksService.toggleTaskBlocked.mockReturnValue(toggledTask);

      const result = controller.toggleTaskById('1');

      expect(result).toEqual(toggledTask);
      expect(result.isBlocked).toBe(true);
      expect(mockTasksService.toggleTaskBlocked).toHaveBeenCalledWith('1');
      expect(mockTasksService.toggleTaskBlocked).toHaveBeenCalledTimes(1);
    });

    it('should toggle from blocked to unblocked', () => {
      const blockedTask: ITask = {
        ...mockTask,
        isBlocked: true,
      };
      const unblockedTask: ITask = {
        ...blockedTask,
        isBlocked: false,
        updatedAt: new Date(),
      };
      mockTasksService.toggleTaskBlocked.mockReturnValue(unblockedTask);

      const result = controller.toggleTaskById('1');

      expect(result.isBlocked).toBe(false);
      expect(mockTasksService.toggleTaskBlocked).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when task not found', () => {
      mockTasksService.toggleTaskBlocked.mockImplementation(() => {
        throw new NotFoundException('Task with ID 999 not found');
      });

      expect(() => controller.toggleTaskById('999')).toThrow(NotFoundException);
      expect(mockTasksService.toggleTaskBlocked).toHaveBeenCalledWith('999');
    });

    it('should not require request body', () => {
      const toggledTask: ITask = {
        ...mockTask,
        isBlocked: true,
        updatedAt: new Date(),
      };
      mockTasksService.toggleTaskBlocked.mockReturnValue(toggledTask);

      const result = controller.toggleTaskById('1');

      expect(result).toBeDefined();
      expect(mockTasksService.toggleTaskBlocked).toHaveBeenCalledWith('1');
    });
  });

  describe('updateTaskById', () => {
    it('should update a task by id', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
        status: EnumTaskStatus.DONE,
      };
      const updatedTask: ITask = {
        ...mockTask,
        ...updateTaskDto,
        updatedAt: new Date(),
      };
      mockTasksService.updateTask.mockReturnValue(updatedTask);

      const result = controller.updateTaskById('1', updateTaskDto);

      expect(result).toEqual(updatedTask);
      expect(mockTasksService.updateTask).toHaveBeenCalledWith(
        '1',
        updateTaskDto,
      );
      expect(mockTasksService.updateTask).toHaveBeenCalledTimes(1);
    });

    it('should update only provided fields', () => {
      const updateTaskDto: UpdateTaskDto = {
        isBlocked: true,
      };
      const updatedTask: ITask = {
        ...mockTask,
        isBlocked: true,
        updatedAt: new Date(),
      };
      mockTasksService.updateTask.mockReturnValue(updatedTask);

      const result = controller.updateTaskById('1', updateTaskDto);

      expect(result.isBlocked).toBe(true);
      expect(mockTasksService.updateTask).toHaveBeenCalledWith(
        '1',
        updateTaskDto,
      );
    });

    it('should update tags field', () => {
      const updateTaskDto: UpdateTaskDto = {
        tags: [EnumTaskTag.HOME, EnumTaskTag.PERSONAL],
      };
      const updatedTask: ITask = {
        ...mockTask,
        tags: [EnumTaskTag.HOME, EnumTaskTag.PERSONAL],
        updatedAt: new Date(),
      };
      mockTasksService.updateTask.mockReturnValue(updatedTask);

      const result = controller.updateTaskById('1', updateTaskDto);

      expect(result.tags).toEqual([EnumTaskTag.HOME, EnumTaskTag.PERSONAL]);
      expect(mockTasksService.updateTask).toHaveBeenCalledWith(
        '1',
        updateTaskDto,
      );
    });

    it('should throw NotFoundException when task not found', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
      };
      mockTasksService.updateTask.mockImplementation(() => {
        throw new NotFoundException('Task with ID 999 not found');
      });

      expect(() => controller.updateTaskById('999', updateTaskDto)).toThrow(
        NotFoundException,
      );
      expect(mockTasksService.updateTask).toHaveBeenCalledWith(
        '999',
        updateTaskDto,
      );
    });
  });

  describe('deleteTaskById', () => {
    it('should delete a task by id', () => {
      mockTasksService.deleteTask.mockReturnValue(undefined);

      controller.deleteTaskById('1');

      expect(mockTasksService.deleteTask).toHaveBeenCalledWith('1');
      expect(mockTasksService.deleteTask).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when task not found', () => {
      mockTasksService.deleteTask.mockImplementation(() => {
        throw new NotFoundException('Task with ID 999 not found');
      });

      expect(() => controller.deleteTaskById('999')).toThrow(NotFoundException);
      expect(mockTasksService.deleteTask).toHaveBeenCalledWith('999');
    });

    it('should not return any value on successful deletion', () => {
      mockTasksService.deleteTask.mockReturnValue(undefined);

      const result = controller.deleteTaskById('1');

      expect(result).toBeUndefined();
    });
  });
});
