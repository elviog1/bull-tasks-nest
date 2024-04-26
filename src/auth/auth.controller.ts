import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registerData: CreateUserDTO ){
        try {
            const registerUser = await this.authService.register(registerData)
            return registerUser
        } catch (error) {
            console.log(error)
        }
    }

    @Post("login")
    async login(@Body() loginData: LoginDTO){
        try {
            return await this.authService.login(loginData)
        } catch (error) {
            console.log(error)
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req){
        return req.user
    }
}
