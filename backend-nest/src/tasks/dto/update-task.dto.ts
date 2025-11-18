import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { EnumTaskStatus, EnumTaskPriority, EnumTaskTag } from '../tasks.model';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Task description',
    example:
      'Write comprehensive documentation for the project including API endpoints and usage examples',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Task tags (array of tags)',
    enum: EnumTaskTag,
    example: [EnumTaskTag.WORK, EnumTaskTag.EDUCATION],
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsEnum(EnumTaskTag as unknown as object, { each: true })
  tags?: EnumTaskTag[];

  @ApiProperty({
    description: 'Task priority level',
    enum: EnumTaskPriority,
    example: EnumTaskPriority.HIGH,
    required: false,
  })
  @IsEnum(EnumTaskPriority, {
    message: 'Priority must be one of: low, medium or high',
  })
  @IsOptional()
  priority?: EnumTaskPriority;

  @ApiProperty({
    description: 'Task status',
    enum: EnumTaskStatus,
    example: EnumTaskStatus.IN_PROGRESS,
    required: false,
  })
  @IsEnum(EnumTaskStatus, {
    message: 'Status must be one of: to-do, in-progress, done',
  })
  @IsOptional()
  status?: EnumTaskStatus;

  @ApiProperty({
    description: 'Whether the task is blocked',
    example: false,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
