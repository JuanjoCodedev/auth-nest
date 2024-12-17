import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { UserEntity } from 'src/modules/user/user.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,

    @InjectPinoLogger(TokensService.name)
    private readonly logger: PinoLogger,
  ) {}

  async generateToken(payload: any, expiresIn: string, secret: string) {
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  async generateAccessAndRefreshTokens(user: UserEntity) {
    const payload = { sub: user.id, email: user.email, roles: user.id_rol, purpose: 'sign in / sign up' };
    const token = await this.generateToken(payload, '5h', 'JWT_SECRET');

    const refreshPayload = { sub: user.id, email: user.email, roles: user.id_rol, purpose: 'refresh' };
    const refreshToken = await this.generateToken(refreshPayload, '10h', 'JWT_SECRET');

    this.logger.debug({ context: 'AuthService', message: `Token generado para usuario ${user.email}` });
    return { uid: user.id, name: user.name, email: user.email, roles: user.id_rol, token, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      if (payload.purpose !== 'refresh') throw new UnauthorizedException('El refresh token proporcionado no es válido');

      const user = await this.userRepository.findOne({ where: { email: payload.email } });
      if (!user) throw new UnauthorizedException('Usuario no encontrado.');

      const newPayload = { sub: user.id, email: user.email, roles: user.id_rol, purpose: 'newToken' };
      const newToken = await this.generateToken(newPayload, '5h', 'JWT_SECRET');

      this.logger.debug({ context: 'AuthService', message: `Token actualizado para el usuario ${user.email}` });
      return { token: newToken };
    } catch (error) {
      this.logger.error('Error al refrescar el token', error);
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
