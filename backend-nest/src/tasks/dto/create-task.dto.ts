import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumTaskPriority, EnumTaskTag } from '../tasks.model';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @Length(1, 50)
  title: string;

  @ApiProperty({
    description: 'Task description',
    example:
      'Write comprehensive documentation for the project including API endpoints and usage examples',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @Length(1, 200)
  description: string;

  @ApiProperty({
    description: 'Task tags (array of tags)',
    enum: EnumTaskTag,
    example: [EnumTaskTag.WORK, EnumTaskTag.EDUCATION],
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(0, { message: 'Tags must be an array (can be empty)' })
  @IsEnum(EnumTaskTag as unknown as object, { each: true })
  @IsNotEmpty({ message: 'Tags are required (can be empty array)' })
  tags: EnumTaskTag[];

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
