import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from 'src/user/user.entity';

import { Auth } from '../auth.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(payload: any, expiresIn: string, secret: string): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  async generateAccessAndRefreshTokens(user: UserEntity): Promise<Auth.SignInResponse> {
    const payload = { sub: user.id, email: user.email, purpose: 'sign in / sign up' };

    const secret = this.configService.get<string>('SECRET_KEY')!;
    const token = await this.generateToken(payload, '5h', secret);

    const refreshPayload = { sub: user.id, email: user.email, purpose: 'refresh' };
    const refreshToken = await this.generateToken(refreshPayload, '10h', secret);

    return { uid: user.id, name: user.name, email: user.email, token, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<Auth.RefreshTokenResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      if (payload.purpose !== 'refresh') throw new UnauthorizedException('El refresh token proporcionado no es válido');

      const user = await this.userRepository.findOne({ where: { email: payload.email } });
      if (!user) throw new UnauthorizedException('Usuario no encontrado.');

      const newPayload = { sub: user.id, email: user.email, purpose: 'newToken' };
      const secret = this.configService.get<string>('SECRET_KEY')!;
      const newToken = await this.generateToken(newPayload, '5h', secret);

      return { token: newToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async validateUserFromPayload(payload: any) {
    if (!payload?.sub || !payload?.email) return null;

    const user = await this.userRepository.findOne({ where: { id: payload.sub, email: payload.email } });
    if (!user) return null;

    return user;
  }
}
