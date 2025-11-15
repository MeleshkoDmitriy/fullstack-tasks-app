import { ApiProperty } from '@nestjs/swagger';
import { EnumTaskPriority, EnumTaskStatus } from '../tasks.model';

export class TaskResponseDto {
  @ApiProperty({
    description: 'Unique task identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Write comprehensive documentation for the project',
  })
  description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Development',
  })
  category: string;

  @ApiProperty({
    description: 'Task priority level',
    enum: EnumTaskPriority,
    example: EnumTaskPriority.HIGH,
  })
  priority: EnumTaskPriority;

  @ApiProperty({
    description: 'Task status',
    enum: EnumTaskStatus,
    example: EnumTaskStatus.IN_PROGRESS,
  })
  status: EnumTaskStatus;

  @ApiProperty({
    description: 'Whether the task is blocked',
    example: false,
  })
  isBlocked: boolean;

  @ApiProperty({
    description: 'Task creation date',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Task last update date',
    example: '2024-01-15T14:45:00.000Z',
  })
  updatedAt: Date;
}
