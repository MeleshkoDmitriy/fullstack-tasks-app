# Список декораторов валидации для CreateTaskDto

## Для строковых полей (title, description, category)

### 1. **MinLength** - минимальная длина строки
```typescript
@MinLength(3, { message: 'Title must be at least 3 characters long' })
title: string;
```

### 2. **MaxLength** - максимальная длина строки
```typescript
@MaxLength(100, { message: 'Title must not exceed 100 characters' })
title: string;
```

### 3. **Length** - точная длина или диапазон
```typescript
@Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
title: string;
```

### 4. **Matches** - проверка по регулярному выражению
```typescript
@Matches(/^[a-zA-Z0-9\s]+$/, { message: 'Title can only contain letters, numbers and spaces' })
title: string;
```

### 5. **IsAlphanumeric** - только буквы и цифры
```typescript
@IsAlphanumeric()
category: string;
```

### 6. **IsAlpha** - только буквы
```typescript
@IsAlpha()
category: string;
```

### 7. **IsUppercase** / **IsLowercase** - регистр
```typescript
@IsUppercase()
category: string;
```

### 8. **Contains** - содержит подстроку
```typescript
@Contains('task', { message: 'Title must contain "task"' })
title: string;
```

### 9. **NotContains** - не содержит подстроку
```typescript
@NotContains('spam', { message: 'Title cannot contain "spam"' })
title: string;
```

### 10. **IsUrl** - проверка URL
```typescript
@IsUrl()
attachmentUrl: string;
```

### 11. **IsEmail** - проверка email
```typescript
@IsEmail()
assigneeEmail: string;
```

### 12. **IsUUID** - проверка UUID
```typescript
@IsUUID()
userId: string;
```

### 13. **IsOptional** - опциональное поле
```typescript
@IsOptional()
@IsString()
description?: string;
```

### 14. **IsDefined** - поле должно быть определено
```typescript
@IsDefined()
title: string;
```

## Для enum полей (priority)

### 15. **IsIn** - значение из списка (альтернатива IsEnum)
```typescript
@IsIn(['low', 'medium', 'high'])
priority: string;
```

## Для числовых полей (если добавите)

### 16. **IsNumber** - проверка числа
```typescript
@IsNumber()
estimatedHours: number;
```

### 17. **IsInt** - целое число
```typescript
@IsInt()
order: number;
```

### 18. **Min** - минимальное значение
```typescript
@Min(0, { message: 'Estimated hours must be at least 0' })
estimatedHours: number;
```

### 19. **Max** - максимальное значение
```typescript
@Max(100, { message: 'Estimated hours must not exceed 100' })
estimatedHours: number;
```

### 20. **IsPositive** - положительное число
```typescript
@IsPositive()
estimatedHours: number;
```

### 21. **IsNegative** - отрицательное число
```typescript
@IsNegative()
penalty: number;
```

## Для дат (если добавите)

### 22. **IsDate** - проверка даты
```typescript
@IsDate()
dueDate: Date;
```

### 23. **IsDateString** - строка в формате даты
```typescript
@IsDateString()
dueDate: string;
```

### 24. **MinDate** - минимальная дата
```typescript
@MinDate(new Date(), { message: 'Due date must be in the future' })
dueDate: Date;
```

### 25. **MaxDate** - максимальная дата
```typescript
@MaxDate(new Date('2025-12-31'), { message: 'Due date must be before 2026' })
dueDate: Date;
```

## Для массивов (если добавите)

### 26. **IsArray** - проверка массива
```typescript
@IsArray()
tags: string[];
```

### 27. **ArrayMinSize** - минимальный размер массива
```typescript
@ArrayMinSize(1, { message: 'At least one tag is required' })
tags: string[];
```

### 28. **ArrayMaxSize** - максимальный размер массива
```typescript
@ArrayMaxSize(10, { message: 'Maximum 10 tags allowed' })
tags: string[];
```

### 29. **ArrayNotEmpty** - массив не пустой
```typescript
@ArrayNotEmpty()
tags: string[];
```

## Для булевых значений (если добавите)

### 30. **IsBoolean** - проверка булева значения
```typescript
@IsBoolean()
isCompleted: boolean;
```

## Комбинированные валидаторы

### 31. **ValidateIf** - условная валидация
```typescript
@ValidateIf(o => o.priority === 'high')
@IsNotEmpty()
urgentReason: string;
```

### 32. **ValidateNested** - валидация вложенных объектов
```typescript
@ValidateNested()
@Type(() => AssigneeDto)
assignee: AssigneeDto;
```

### 33. **IsObject** - проверка объекта
```typescript
@IsObject()
metadata: Record<string, any>;
```



