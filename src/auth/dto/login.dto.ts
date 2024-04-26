import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    //@Transform(({value}) => value.strim())
    password: string
}