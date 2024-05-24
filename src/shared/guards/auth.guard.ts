import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthService } from 'src/core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Su permiso a expirado, por favor vuelva a validarse');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: 'JWT_SECRET' });

      console.log('Payload generado:', payload);

      request['user'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const refreshToken = request.headers['x-refresh-token'];

        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token no proporcionado');
        }

        const newTokenResponse = await this.authService.refreshToken(refreshToken as string);
        request.headers.authorization = `Bearer ${newTokenResponse.token}`;

        const payload = await this.jwtService.verifyAsync(newTokenResponse.token, { secret: 'JWT_SECRET' });

        if (payload.refresh) {
          console.log('Se ha renovado el token', payload);
        } else {
          console.log('No se ha renovado el token');
        }

        request['user'] = payload;
      } else {
        throw new UnauthorizedException('Vuelva a validar sus datos');
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
