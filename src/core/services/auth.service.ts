import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PersonDto, SignInDto, VerifyEmailDto } from 'src/shared/dtos/person.dto';
import { NodemailerService } from './nodemailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,

    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
  ) {}

  private async generateToken(payload: any, expiresIn: string, secret: string) {
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  async generateTokens(user: UserEntity) {
    const payload = { sub: user.uid, email: user.useremail, roles: user.roles, purpose: 'sign in / sign up' };
    const token = await this.generateToken(payload, '5m', 'JWT_SECRET');

    const refreshPayload = { sub: user.uid, email: user.useremail, roles: user.roles, purpose: 'refresh' };
    const refreshToken = await this.generateToken(refreshPayload, '10m', 'JWT_SECRET');

    this.logger.debug({ context: 'AuthService', message: `Token generado para usuario ${user.useremail}` });
    return { uid: user.uid, name: user.username, email: user.useremail, roles: user.roles, token, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      if (payload.purpose !== 'refresh') throw new UnauthorizedException('El refresh token proporcionado no es válido');

      const user = await this.userRepository.findOne({ where: { useremail: payload.email } });
      if (!user) throw new UnauthorizedException('Usuario no encontrado.');

      const newPayload = { sub: user.uid, email: user.useremail, roles: user.roles, purpose: 'newToken' };
      const newToken = await this.generateToken(newPayload, '5m', 'JWT_SECRET');

      this.logger.debug({ context: 'AuthService', message: `Token actualizado para el usuario ${user.useremail}` });
      return { token: newToken };
    } catch (error) {
      this.logger.error('Error al refrescar el token', error);
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async findOneByEmail(userEmail: string) {
    return this.userRepository.findOne({ where: { useremail: userEmail } });
  }

  async signUpWithProvider(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  generateRandomPassword(): string {
    const randomPassword = Math.random().toString(36).slice(-8);
    this.logger.debug({ context: 'AuthService', message: `Contraseña aleatoria: ${randomPassword}` });
    return randomPassword;
  }

  async signUp(signUpDto: PersonDto) {
    const existingUser = await this.findOneByEmail(signUpDto.useremail);
    if (existingUser) throw new UnauthorizedException('Pruebe con un correo electrónico diferente.');

    const newUser = this.userRepository.create(signUpDto);
    const savedAccount = await this.userRepository.save(newUser);

    this.logger.debug({ context: 'AuthService', message: `Usuario ${newUser.useremail} registrado` });
    return this.generateTokens(savedAccount);
  }

  async validateUser(useremail: string, userpassword: string): Promise<any> {
    const user = await this.findOneByEmail(useremail);
    if (!user) throw new UnauthorizedException('Email no fue encontrado');

    const isPasswordValid = await compare(userpassword, user.userpassword);
    if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta.');

    const { userpassword: _, ...result } = user;
    this.logger.debug({ context: 'AuthService', message: `Usuario ${useremail} validado` });
    return result;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.useremail, signInDto.userpassword);
    this.logger.debug({ context: 'AuthService', message: `Usuario ${signInDto.useremail} ha iniciado sesión` });
    return this.generateTokens(user);
  }

  async sendPasswordResetEmail(reset: VerifyEmailDto) {
    const user = await this.findOneByEmail(reset.useremail);
    if (!user) throw new UnauthorizedException('Este email es invalido, por favor vuelva a intentarlo.');

    const payload = { uid: user.uid, roles: user.roles, purpose: 'Reset Password' };
    const tokenReset = await this.generateToken(payload, '10m', 'JWT_SECRET');

    const checkLink = `http://localhost:4200/auth/recover/password/?uid=${user.uid}&token=${tokenReset}`;
    const emailContent = `<p>Hola ${user.username}, este link va a estar activo por solo 10 minutos.</p> ${checkLink}`;

    await this.nodemailerService.sendMail({
      email: user.useremail,
      subject: 'Actualizar contraseña',
      html: emailContent,
    });

    this.logger.debug({ context: 'AuthService', message: `Restablecimiento de contraseña enviado a ${user.useremail}` });
    return { message: `Se ha enviado el correo electronico a: ${user.useremail}`, tokenReset };
  }
}
