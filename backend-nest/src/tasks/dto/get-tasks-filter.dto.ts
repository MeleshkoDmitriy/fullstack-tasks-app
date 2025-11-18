import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { EnumTaskPriority, EnumTaskStatus, EnumTaskTag } from '../tasks.model';

@ValidatorConstraint({ async: false })
class IsValidTagsConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return true;
    }
    const validTags = Object.values(EnumTaskTag);
    return value.every((tag: unknown) =>
      validTags.includes(tag as EnumTaskTag),
    );
  }

  defaultMessage(): string {
    const validTags = Object.values(EnumTaskTag).join(', ');
    return `tags must be one of the following values: ${validTags}`;
  }
}

function IsValidTags(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidTagsConstraint,
    });
  };
}

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
    if (value === undefined || value === null) {
      return undefined;
    }
    const validTags = Object.values(EnumTaskTag);
    let tagsToCheck: string[] = [];

    if (typeof value === 'string') {
      tagsToCheck = value.split(',').map((tag: string) => tag.trim());
    } else if (Array.isArray(value)) {
      tagsToCheck = value.map((tag: unknown) => String(tag).trim());
    } else {
      return undefined;
    }

    const invalidTags = tagsToCheck.filter(
      (tag) => !validTags.includes(tag as EnumTaskTag),
    );

    if (invalidTags.length > 0) {
      const validTagsList = validTags.join(', ');
      throw new BadRequestException(
        `Invalid tag(s): ${invalidTags.join(', ')}. Must be one of: ${validTagsList}`,
      );
    }

    return tagsToCheck as EnumTaskTag[];
  })
  @Validate(IsValidTags)
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
    description: 'Search tasks by title or description',
    example: 'documentation',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
