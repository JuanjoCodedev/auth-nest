import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from 'src/user/user.entity';

import { Authentication } from '../authentication.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  private async generateToken(payload: any, expiresIn: string, secret: string): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  async generateAccessAndRefreshTokens(user: UserEntity): Promise<Authentication.SignInResponse> {
    const payload = { sub: user.id, email: user.email, role: user.role_id, purpose: 'sign in / sign up' };

    const secret = this.configService.get<string>('SECRET_KEY')!;
    const token = await this.generateToken(payload, '5h', secret);

    const refreshPayload = { sub: user.id, email: user.email, purpose: 'refresh' };
    const refreshToken = await this.generateToken(refreshPayload, '10h', secret);

    return { uid: user.id, name: user.name, email: user.email, token, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<Authentication.RefreshTokenResponse> {
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

  async validateUserFromPayload(payload: any): Promise<UserEntity | null> {
    if (!payload?.sub || !payload?.email) return null;

    return await this.userRepository.findOne({
      where: { id: payload.sub, email: payload.email },
      relations: ['role'],
    });
  }

  async generateResetToken(userId: number): Promise<string> {
    const payload = { sub: userId, purpose: 'reset' };

    const secret = this.configService.get<string>('SECRET_KEY')!;

    return this.generateToken(payload, '15m', secret);
  }

  async validateResetToken(token: string): Promise<number> {
    try {
      const secret = this.configService.get<string>('SECRET_KEY')!;

      const payload = await this.jwtService.verifyAsync(token, { secret });
      if (payload.purpose !== 'reset') throw new UnauthorizedException('Token inválido para reset');

      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Token de recuperación inválido o expirado');
    }
  }
}
