import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, email, username }: CreateUserDTO) {
    try {
      const userFound = await this.userService.findOneByEmail(email);
      if (userFound) {
        throw new BadRequestException('Email already exists.');
      }

      const hashPassword = await bcryptjs.hash(password, 10);

      this.userService.createUser({
        username,
        email,
        password: hashPassword,
      });

      return {message: "User created"} ;
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      const userFound = await this.userService.findOneByEmail(email);
      if (!userFound) {
        throw new UnauthorizedException('Invalid email.');
      }
      const passwordIsValid = await bcryptjs.compare(
        password,
        userFound.password,
      );

      if (!passwordIsValid) {
        throw new UnauthorizedException('Invalid password.');
      }

      const payload = {id:userFound._id, username: userFound.username}
      const token = await this.jwtService.signAsync(payload)
      return { token: token };
    } catch (error) {
      console.log(error);
    }
  }
}
