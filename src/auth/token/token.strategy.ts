import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { TokenService } from './token.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly _tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY')!,
    });
  }

  async validate(payload: any): Promise<{ id: number; email: string }> {
    const user = await this._tokenService.validateUserFromPayload(payload);
    if (!user) throw new UnauthorizedException('Token inválido o usuario no encontrado.');
    return user;
  }
}
