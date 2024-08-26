import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PersonDto, SignInDto, VerifyEmailDto } from 'src/shared/dtos/person.dto';
import { EMailerService } from '../mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly mailerService: EMailerService,
    private readonly configService: ConfigService,

    @InjectPinoLogger(AuthService.name)
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
  private async generateToken(payload: any, expiresIn: string, secret: string) {
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  /**
   * ?Genera un token de acceso y un token de refresco para un usuario.
   *
   * *@param user - El usuario para el cual se generan los tokens.
   * *@returns Un objeto que contiene el uid, nombre, email, roles, token de acceso y token de refresco.
   */
  async generateTokens(user: UserEntity) {
    const payload = { sub: user.uid, email: user.email, roles: user.roles, purpose: 'sign in / sign up' };
    const token = await this.generateToken(payload, this.configService.get('EXPIRED_TOKEN'), this.configService.get('SECRET_KEY'));
    console.log('TIEMPO DE TOKEN', this.configService.get('EXPIRED_TOKEN'));

    const refreshPayload = { sub: user.uid, email: user.email, roles: user.roles, purpose: 'refresh' };
    const refreshToken = await this.generateToken(refreshPayload, this.configService.get('EXPIRED_REFRESH_TOKEN'), this.configService.get('SECRET_KEY'));

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
      const newToken = await this.generateToken(newPayload, '5m', 'JWT_SECRET');

      this.logger.debug({ context: 'AuthService', message: `Token actualizado para el usuario ${user.email}` });
      return { token: newToken };
    } catch (error) {
      this.logger.error('Error al refrescar el token', error);
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  /**
   * ?Busca un usuario en la base de datos usando su email.
   *
   * *@param userEmail - El email del usuario a buscar.
   * *@returns El usuario encontrado o null si no existe.
   */
  async findOneByEmail(userEmail: string) {
    return this.userRepository.findOne({ where: { email: userEmail } });
  }

  /**
   * ?Registra un nuevo usuario utilizando datos proporcionados.
   *
   * *@param userData - Datos del usuario para crear una nueva cuenta.
   * *@returns El usuario creado y registrado en la base de datos.
   */
  async signUpWithProvider(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  /**
   * ?Genera una contraseña aleatoria de 8 caracteres.
   *
   * *@returns La contraseña aleatoria generada.
   */
  generateRandomPassword(): string {
    const randomPassword = Math.random().toString(36).slice(-8);
    this.logger.debug({ context: 'AuthService', message: `Contraseña aleatoria: ${randomPassword}` });
    return randomPassword;
  }

  /**
   * ?Registra un nuevo usuario y genera tokens de autenticación.
   *
   * *@param signUpDto - Datos del usuario para el registro.
   * *@param ipAddress - Dirección IP del usuario para registrar.
   * *@throws UnauthorizedException - Si el email ya está en uso.
   * *@returns Un objeto que contiene tokens de autenticación para el nuevo usuario.
   */
  async signUp(signUpDto: PersonDto, ipAddress: string) {
    const existingUser = await this.findOneByEmail(signUpDto.email);
    if (existingUser) throw new UnauthorizedException('Pruebe con un correo electrónico diferente.');

    const newUser = this.userRepository.create({ ...signUpDto, ipAddress: ipAddress });
    const savedAccount = await this.userRepository.save(newUser);

    this.logger.debug({ context: 'AuthService', message: `Usuario ${newUser.email} registrado` });
    return this.generateTokens(savedAccount);
  }

  /**
   * ?Valida las credenciales de un usuario y verifica la dirección IP.
   *
   * *@param useremail - Email del usuario para la validación.
   * *@param userpassword - Contraseña del usuario para la validación.
   * *@param req - Objeto de solicitud que contiene la IP del usuario.
   * *@throws UnauthorizedException - Si el email no es encontrado, la contraseña es incorrecta, o la IP no coincide.
   * *@returns Los detalles del usuario sin la contraseña.
   */
  async validateUser(useremail: string, userpassword: string, req: Request): Promise<any> {
    const user = await this.findOneByEmail(useremail);
    if (!user) throw new UnauthorizedException('Email no fue encontrado');

    const isPasswordValid = await compare(userpassword, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta.');

    const userIp = req.ip;
    if (user.ipAddress !== userIp) {
      await this.sendUnkanownIpEmail({ email: useremail, uid: user.uid, name: user.name });
      throw new UnauthorizedException('Dispositivo desconocido');
    }

    const { password: _, ...result } = user;
    this.logger.debug({ context: 'AuthService', message: `Usuario ${useremail} validado` });
    return result;
  }

  /**
   * ?Inicia sesión en el sistema y genera tokens para el usuario.
   *
   * *@param signInDto - Datos de inicio de sesión del usuario.
   * *@param req - Objeto de solicitud que contiene la IP del usuario.
   * *@returns Un objeto que contiene tokens de autenticación para el usuario.
   */
  async signIn(signInDto: SignInDto, req: Request) {
    const user = await this.validateUser(signInDto.email, signInDto.password, req);
    this.logger.debug({ context: 'AuthService', message: `Usuario ${signInDto.email} ha iniciado sesión` });
    return this.generateTokens(user);
  }

  /**
   * ?Envía un correo electrónico para restablecer la contraseña del usuario.
   *
   * *@param reset - Contiene la información del usuario como email y uid. El UID debe coincidir
   * *con el UID del usuario encontrado mediante el correo electrónico.
   *
   * *@throws UnauthorizedException - Si el correo electrónico proporcionado no existe
   * *en la base de datos o el UID no coincide con el correo electrónico.
   *
   * *@returns Un objeto con un mensaje de confirmación que indica que el
   * *correo electrónico de recuperación ha sido enviado.
   */
  async sendPasswordResetEmail(reset: VerifyEmailDto) {
    const user = await this.findOneByEmail(reset.email);

    if (!user) throw new UnauthorizedException('Este email es invalido, por favor vuelva a intentarlo.');

    const newPassword = this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update({ uid: user.uid }, { password: hashedPassword });

    const payload = { uid: user.uid, roles: user.roles, purpose: 'Reset Password' };
    const tokenReset = await this.generateToken(payload, '30m', 'JWT_SECRET');

    const checkLink = `http://localhost:4200/auth/recover/password/?uid=${user.uid}&token=${tokenReset}`;

    await this.mailerService.sendPasswordResetEmail(
      {
        email: user.email,
        name: user.name,
      },
      newPassword,
      checkLink,
    );

    this.logger.debug(`Restablecimiento de contraseña enviado a ${user.email}`);
    return { message: `Se ha enviado el correo electrónico de recuperación a ${user.email}` };
  }

  /**
   * ?Envía un correo electrónico para iniciar sesión en un dispositivo diferente.
   *
   * *@param reset - Contiene la información del usuario como email, uid, y nombre.
   * *@throws UnauthorizedException - Si el email no es válido.
   * *@returns Un objeto con un mensaje de confirmación y el token de inicio de sesión.
   */
  async sendUnkanownIpEmail(reset: VerifyEmailDto) {
    const user = await this.findOneByEmail(reset.email);
    if (!user) throw new UnauthorizedException('Este email es invalido, por favor vuelva a intentarlo.');

    const payload = { uid: user.uid, roles: user.roles, purpose: 'Reset Password' };
    const tokenReset = await this.generateToken(payload, '30m', 'JWT_SECRET');

    const checkLink = `http://localhost:4200/auth/recover/password/?uid=${user.uid}&token=${tokenReset}`;

    await this.mailerService.sendUnknowIpEmail(
      {
        email: user.email,
        name: user.name,
      },
      checkLink,
    );

    this.logger.debug({ context: 'AuthService', message: `Establecer un nuevo dispositivo enviado a ${user.email}` });
    return { message: `Se ha enviado el correo electronico a: ${user.email}`, tokenReset };
  }
}
