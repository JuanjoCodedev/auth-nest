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

  /**
   * ?Genera un token JWT con un payload dado y una clave secreta.
   *
   * *@param payload - Datos a incluir en el token.
   * *@param expiresIn - Tiempo de expiración del token (ej. '1h', '10m').
   * *@param secret - Clave secreta utilizada para firmar el token.
   * *@returns El token JWT generado.
   */
  async generateToken(payload: any, expiresIn: string, secret: string) {
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  /**
   * ?Genera un token de acceso y un token de refresco para un usuario.
   *
   * *@param user - El usuario para el cual se generan los tokens.
   * *@returns Un objeto que contiene el uid, nombre, email, roles, token de acceso y token de refresco.
   */
  async generateAccessAndRefreshTokens(user: UserEntity) {
    const payload = { sub: user.uid, email: user.email, roles: user.roles, purpose: 'sign in / sign up' };
    const token = await this.generateToken(payload, '5h', 'JWT_SECRET');

    const refreshPayload = { sub: user.uid, email: user.email, roles: user.roles, purpose: 'refresh' };
    const refreshToken = await this.generateToken(refreshPayload, '10h', 'JWT_SECRET');

    this.logger.debug({ context: 'AuthService', message: `Token generado para usuario ${user.email}` });
    return { uid: user.uid, name: user.name, email: user.email, roles: user.roles, token, refreshToken };
  }

  /**
   * ?Refresca el token de acceso usando un token de refresco.
   *
   * *@param refreshToken - Token de refresco para validar y generar un nuevo token.
   * *@throws UnauthorizedException - Si el token de refresco no es válido o el usuario no es encontrado.
   * *@returns Un objeto que contiene el nuevo token de acceso.
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      if (payload.purpose !== 'refresh') throw new UnauthorizedException('El refresh token proporcionado no es válido');

      const user = await this.userRepository.findOne({ where: { email: payload.email } });
      if (!user) throw new UnauthorizedException('Usuario no encontrado.');

      const newPayload = { sub: user.uid, email: user.email, roles: user.roles, purpose: 'newToken' };
      const newToken = await this.generateToken(newPayload, '5h', 'JWT_SECRET');

      this.logger.debug({ context: 'AuthService', message: `Token actualizado para el usuario ${user.email}` });
      return { token: newToken };
    } catch (error) {
      this.logger.error('Error al refrescar el token', error);
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
