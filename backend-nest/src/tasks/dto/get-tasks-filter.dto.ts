import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumTaskPriority, EnumTaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @ApiProperty({
    description: 'Filter tasks by status',
    enum: EnumTaskStatus,
    example: EnumTaskStatus.TODO,
    required: false,
  })
  @IsEnum(EnumTaskStatus)
  @IsOptional()
  status?: EnumTaskStatus;

  @ApiProperty({
    description: 'Filter tasks by priority',
    enum: EnumTaskPriority,
    example: EnumTaskPriority.HIGH,
    required: false,
  })
  @IsEnum(EnumTaskPriority)
  @IsOptional()
  priority?: EnumTaskPriority;

  @ApiProperty({
    description: 'Filter tasks by blocked status',
    example: false,
    type: Boolean,
    required: false,
  })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value as boolean | undefined;
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @ApiProperty({
    description: 'Search tasks by title or description',
    example: 'documentation',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
