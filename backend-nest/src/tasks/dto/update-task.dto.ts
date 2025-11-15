import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { EnumTaskStatus } from '../tasks.model';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(EnumTaskStatus, {
    message: 'Status must be one of: to-do, in-progress, done',
  })
  @IsOptional()
  status?: EnumTaskStatus;

  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
