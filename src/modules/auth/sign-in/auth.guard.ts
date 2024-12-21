import { TokensService } from './../tokens/tokens.service';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly _logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Su permiso a expirado, por favor vuelva a validarse');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: 'JWT_SECRET' });

      request['user'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const refreshToken = request.headers['x-refresh-token'];

        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token no proporcionado');
        }

        const newTokenResponse = await this.tokensService.refreshToken(refreshToken as string);
        request.headers.authorization = `Bearer ${newTokenResponse.token}`;

        const payload = await this.jwtService.verify(newTokenResponse.token, { secret: 'JWT_SECRET' });

        if (payload.refresh) {
          this._logger.log({ context: 'AuthGuards', message: `Se ha renovado el token', ${payload}` });
        } else {
          this._logger.error({ context: 'AuthGuards', message: `No se ha renovado el token` });
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
