import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumTaskPriority, EnumTaskStatus, EnumTaskTag } from '../tasks.model';

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
    description: 'Filter tasks by tags (comma-separated: work,education)',
    enum: EnumTaskTag,
    example: [EnumTaskTag.WORK, EnumTaskTag.EDUCATION],
    required: false,
    isArray: true,
  })
  @Transform(({ value }): EnumTaskTag[] | undefined => {
    const validTags = Object.values(EnumTaskTag);
    if (typeof value === 'string') {
      const filtered = value
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => validTags.includes(tag as EnumTaskTag));
      return filtered as EnumTaskTag[];
    }
    if (Array.isArray(value)) {
      const filtered = value.filter((tag: unknown) =>
        validTags.includes(tag as EnumTaskTag),
      );
      return filtered as EnumTaskTag[];
    }
    return undefined;
  })
  @IsArray()
  @IsEnum(EnumTaskTag as unknown as object, { each: true })
  @IsOptional()
  tags?: EnumTaskTag[];

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
    description: 'Search tasks by title, description or tags',
    example: 'documentation',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
