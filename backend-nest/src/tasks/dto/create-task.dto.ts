import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumTaskPriority } from '../tasks.model';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @IsEnum(EnumTaskPriority, {
    message: 'Priority must be one of: low, medium or high',
  })
  @IsNotEmpty({ message: 'Priority is required' })
  priority: EnumTaskPriority;
}
