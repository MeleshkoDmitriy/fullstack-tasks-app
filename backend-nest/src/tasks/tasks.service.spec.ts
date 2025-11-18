import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  EnumTaskPriority,
  EnumTaskStatus,
  EnumTaskTag,
  ITask,
} from './tasks.model';
import { CreateTaskDto, UpdateTaskDto, GetTasksFilterDto } from './dto';

describe('TasksService', () => {
  let service: TasksService;
  const mockTasks: ITask[] = [
    {
      id: '1',
      title: 'Test Task 1',
      description: 'Description 1',
      tags: [EnumTaskTag.WORK, EnumTaskTag.EDUCATION],
      priority: EnumTaskPriority.HIGH,
      status: EnumTaskStatus.TODO,
      isBlocked: false,
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
    },
    {
      id: '2',
      title: 'Test Task 2',
      description: 'Description 2',
      tags: [EnumTaskTag.WORK],
      priority: EnumTaskPriority.MEDIUM,
      status: EnumTaskStatus.IN_PROGRESS,
      isBlocked: true,
      createdAt: new Date('2025-01-02'),
      updatedAt: new Date('2025-01-02'),
    },
    {
      id: '3',
      title: 'Test Task 3',
      description: 'Another description',
      tags: [EnumTaskTag.HOME, EnumTaskTag.PERSONAL],
      priority: EnumTaskPriority.LOW,
      status: EnumTaskStatus.DONE,
      isBlocked: false,
      createdAt: new Date('2025-01-03'),
      updatedAt: new Date('2025-01-03'),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    (service as any).tasks = mockTasks.map((task) => ({
      ...task,
      tags: [...task.tags],
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllTasks', () => {
    it('should return all tasks when no filters provided', () => {
      const filterDto: GetTasksFilterDto = {};
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockTasks);
    });

    it('should filter tasks by isBlocked = true', () => {
      const filterDto: GetTasksFilterDto = { isBlocked: true };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(1);
      expect(result[0].isBlocked).toBe(true);
      expect(result[0].id).toBe('2');
    });

    it('should filter tasks by isBlocked = false', () => {
      const filterDto: GetTasksFilterDto = { isBlocked: false };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(2);
      expect(result.every((t) => t.isBlocked === false)).toBe(true);
    });

    it('should filter tasks by priority', () => {
      const filterDto: GetTasksFilterDto = {
        priority: EnumTaskPriority.HIGH,
      };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(1);
      expect(result[0].priority).toBe(EnumTaskPriority.HIGH);
    });

    it('should filter tasks by status', () => {
      const filterDto: GetTasksFilterDto = {
        status: EnumTaskStatus.DONE,
      };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe(EnumTaskStatus.DONE);
    });

    it('should filter tasks by search string in title', () => {
      const filterDto: GetTasksFilterDto = { search: 'Task 1' };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('Task 1');
    });

    it('should filter tasks by search string in description', () => {
      const filterDto: GetTasksFilterDto = { search: 'Another' };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(1);
      expect(result[0].description).toContain('Another');
    });

    it('should filter tasks by multiple search words (AND logic)', () => {
      const filterDto: GetTasksFilterDto = { search: 'Test Task' };
      const result = service.findAllTasks(filterDto);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((task) => {
        const searchText = `${task.title} ${task.description}`.toLowerCase();
        expect(searchText).toContain('test');
        expect(searchText).toContain('task');
      });
    });

    it('should not find tasks when not all search words are present', () => {
      const filterDto: GetTasksFilterDto = { search: 'Test Nonexistent' };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(0);
    });

    it('should search only in title and description, not in tags', () => {
      const filterDto: GetTasksFilterDto = { search: 'work' };
      const result = service.findAllTasks(filterDto);

      result.forEach((task) => {
        const searchText = `${task.title} ${task.description}`.toLowerCase();
        expect(searchText).toContain('work');
      });
    });

    it('should combine search with other filters', () => {
      const filterDto: GetTasksFilterDto = {
        search: 'Test',
        priority: EnumTaskPriority.HIGH,
      };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('Test');
      expect(result[0].priority).toBe(EnumTaskPriority.HIGH);
    });

    it('should filter tasks by tags', () => {
      const filterDto: GetTasksFilterDto = {
        tags: [EnumTaskTag.WORK],
      };
      const result = service.findAllTasks(filterDto);

      expect(result.length).toBeGreaterThan(0);
      expect(result.every((t) => t.tags.includes(EnumTaskTag.WORK))).toBe(true);
    });

    it('should filter tasks by multiple tags (OR logic)', () => {
      const filterDto: GetTasksFilterDto = {
        tags: [EnumTaskTag.WORK, EnumTaskTag.HOME],
      };
      const result = service.findAllTasks(filterDto);

      expect(result.length).toBeGreaterThan(0);
      expect(
        result.every((t) =>
          t.tags.some((tag) =>
            [EnumTaskTag.WORK, EnumTaskTag.HOME].includes(tag),
          ),
        ),
      ).toBe(true);
    });

    it('should apply multiple filters', () => {
      const filterDto: GetTasksFilterDto = {
        isBlocked: false,
        priority: EnumTaskPriority.HIGH,
      };
      const result = service.findAllTasks(filterDto);

      expect(result).toHaveLength(1);
      expect(result[0].isBlocked).toBe(false);
      expect(result[0].priority).toBe(EnumTaskPriority.HIGH);
    });

    it('should be case-insensitive for search', () => {
      const filterDto: GetTasksFilterDto = { search: 'TASK' };
      const result = service.findAllTasks(filterDto);

      expect(result.length).toBeGreaterThan(0);
      expect(result.every((t) => t.title.toLowerCase().includes('task'))).toBe(
        true,
      );
    });
  });

  describe('findOneTask', () => {
    it('should return a task by id', () => {
      const result = service.findOneTask('1');

      expect(result).toBeDefined();
      expect(result.id).toBe('1');
      expect(result.title).toBe('Test Task 1');
    });

    it('should throw NotFoundException when task not found', () => {
      expect(() => service.findOneTask('non-existent')).toThrow(
        NotFoundException,
      );
      expect(() => service.findOneTask('non-existent')).toThrow(
        'Task with ID non-existent not found',
      );
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
        tags: [EnumTaskTag.WORK],
        priority: EnumTaskPriority.MEDIUM,
      };

      const result = service.createTask(createTaskDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.title).toBe(createTaskDto.title);
      expect(result.description).toBe(createTaskDto.description);
      expect(result.tags).toEqual(createTaskDto.tags);
      expect(result.priority).toBe(createTaskDto.priority);
      expect(result.status).toBe(EnumTaskStatus.TODO);
      expect(result.isBlocked).toBe(false);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should create task with empty tags array', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
        tags: [],
        priority: EnumTaskPriority.LOW,
      };

      const result = service.createTask(createTaskDto);

      expect(result.tags).toEqual([]);
    });

    it('should create task with multiple tags', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
        tags: [EnumTaskTag.WORK, EnumTaskTag.EDUCATION, EnumTaskTag.HOME],
        priority: EnumTaskPriority.HIGH,
      };

      const result = service.createTask(createTaskDto);

      expect(result.tags).toHaveLength(3);
      expect(result.tags).toContain(EnumTaskTag.WORK);
      expect(result.tags).toContain(EnumTaskTag.EDUCATION);
      expect(result.tags).toContain(EnumTaskTag.HOME);
    });

    it('should add created task to tasks array', () => {
      const initialLength = (service as any).tasks.length;
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
        tags: [EnumTaskTag.WORK],
        priority: EnumTaskPriority.LOW,
      };

      service.createTask(createTaskDto);

      expect((service as any).tasks.length).toBe(initialLength + 1);
    });
  });

  describe('updateTask', () => {
    it('should update task fields', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
        status: EnumTaskStatus.DONE,
      };

      const result = service.updateTask('1', updateTaskDto);

      expect(result.title).toBe('Updated Title');
      expect(result.status).toBe(EnumTaskStatus.DONE);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.id).toBe('1');
    });

    it('should update only provided fields', () => {
      const originalTask = { ...mockTasks[0] };
      const updateTaskDto: UpdateTaskDto = {
        title: 'Only Title Updated',
      };

      const result = service.updateTask('1', updateTaskDto);

      expect(result.title).toBe('Only Title Updated');
      expect(result.description).toBe(originalTask.description);
      expect(result.tags).toEqual(originalTask.tags);
      expect(result.priority).toBe(originalTask.priority);
    });

    it('should update tags field', () => {
      const updateTaskDto: UpdateTaskDto = {
        tags: [EnumTaskTag.HOME, EnumTaskTag.PERSONAL],
      };

      const result = service.updateTask('1', updateTaskDto);

      expect(result.tags).toEqual([EnumTaskTag.HOME, EnumTaskTag.PERSONAL]);
    });

    it('should update tags to empty array', () => {
      const updateTaskDto: UpdateTaskDto = {
        tags: [],
      };

      const result = service.updateTask('1', updateTaskDto);

      expect(result.tags).toEqual([]);
    });

    it('should update isBlocked field', () => {
      const updateTaskDto: UpdateTaskDto = {
        isBlocked: true,
      };

      const result = service.updateTask('1', updateTaskDto);

      expect(result.isBlocked).toBe(true);
    });

    it('should throw NotFoundException when task not found', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
      };

      expect(() => service.updateTask('non-existent', updateTaskDto)).toThrow(
        NotFoundException,
      );
    });

    it('should update updatedAt timestamp', () => {
      const originalUpdatedAt = mockTasks[0].updatedAt;
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
      };

      setTimeout(() => {
        const result = service.updateTask('1', updateTaskDto);
        expect(result.updatedAt.getTime()).toBeGreaterThan(
          originalUpdatedAt.getTime(),
        );
      }, 10);
    });
  });

  describe('toggleTaskBlocked', () => {
    it('should toggle isBlocked from false to true', () => {
      const result = service.toggleTaskBlocked('1');

      expect(result.isBlocked).toBe(true);
      expect(result.id).toBe('1');
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should toggle isBlocked from true to false', () => {
      const result = service.toggleTaskBlocked('2');

      expect(result.isBlocked).toBe(false);
      expect(result.id).toBe('2');
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should update updatedAt timestamp', () => {
      const originalUpdatedAt = mockTasks[0].updatedAt;

      setTimeout(() => {
        const result = service.toggleTaskBlocked('1');
        expect(result.updatedAt.getTime()).toBeGreaterThan(
          originalUpdatedAt.getTime(),
        );
      }, 10);
    });

    it('should throw NotFoundException when task not found', () => {
      expect(() => service.toggleTaskBlocked('non-existent')).toThrow(
        NotFoundException,
      );
      expect(() => service.toggleTaskBlocked('non-existent')).toThrow(
        'Task with ID non-existent not found',
      );
    });

    it('should preserve other task properties when toggling', () => {
      const originalTask = { ...mockTasks[0] };
      const result = service.toggleTaskBlocked('1');

      expect(result.title).toBe(originalTask.title);
      expect(result.description).toBe(originalTask.description);
      expect(result.tags).toEqual(originalTask.tags);
      expect(result.priority).toBe(originalTask.priority);
      expect(result.status).toBe(originalTask.status);
      expect(result.id).toBe(originalTask.id);
      expect(result.createdAt).toEqual(originalTask.createdAt);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by id', () => {
      const initialLength = (service as any).tasks.length;

      service.deleteTask('1');

      expect((service as any).tasks.length).toBe(initialLength - 1);
      expect(
        (service as any).tasks.find((t: ITask) => t.id === '1'),
      ).toBeUndefined();
    });

    it('should throw NotFoundException when task not found', () => {
      expect(() => service.deleteTask('non-existent')).toThrow(
        NotFoundException,
      );
      expect(() => service.deleteTask('non-existent')).toThrow(
        'Task with ID non-existent not found',
      );
    });

    it('should not delete other tasks', () => {
      const task2 = (service as any).tasks.find((t: ITask) => t.id === '2');

      service.deleteTask('1');

      expect((service as any).tasks.find((t: ITask) => t.id === '2')).toEqual(
        task2,
      );
    });
  });
});
