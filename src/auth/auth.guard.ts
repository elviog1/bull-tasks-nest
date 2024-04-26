import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstant } from './constant/jwt_constant';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const token =  this.extractTokenFromHeader(request)
    if(!token){
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token,{secret:jwtConstant.secret})
      request.user = payload
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException()
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}