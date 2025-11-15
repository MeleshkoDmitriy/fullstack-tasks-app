import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { EnumTaskPriority, EnumTaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsEnum(EnumTaskStatus)
  @IsOptional()
  status?: EnumTaskStatus;

  @IsEnum(EnumTaskPriority)
  @IsOptional()
  priority?: EnumTaskPriority;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value as boolean | undefined;
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @IsString()
  @IsOptional()
  search?: string;
}
