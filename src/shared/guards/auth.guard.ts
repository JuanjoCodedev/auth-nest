import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Su permiso a expirado, por favor vuelva a validarse');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.TOKEN_KEY });

      console.log('Payload generado:', payload);

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Vuelva a validar sus datos');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
