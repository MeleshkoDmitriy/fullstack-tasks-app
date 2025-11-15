import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumTaskPriority } from '../tasks.model';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example:
      'Write comprehensive documentation for the project including API endpoints and usage examples',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Development',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @ApiProperty({
    description: 'Task priority level',
    enum: EnumTaskPriority,
    example: EnumTaskPriority.HIGH,
  })
  @IsEnum(EnumTaskPriority, {
    message: 'Priority must be one of: low, medium or high',
  })
  @IsNotEmpty({ message: 'Priority is required' })
  priority: EnumTaskPriority;
}
