import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  @IsOptional()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;
}
