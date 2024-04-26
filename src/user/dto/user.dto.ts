import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  //@Transform(({value}) => value.trim())
  password: string;
}
