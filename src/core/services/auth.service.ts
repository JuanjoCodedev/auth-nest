import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PersonDto } from 'src/shared/dtos/person.dto';
import { NodemailerService } from './nodemailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
  ) {}

  private async generateTokens(user: UserEntity) {
    const payload = { uid: user.uid, email: user.useremail, roles: user.roles, purpose: 'sign in / sign up' };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '5m' });

    const refreshPayload = { uid: user.uid, email: user.useremail, roles: user.roles, purpose: 'refresh' };
    const refreshToken = await this.jwtService.signAsync(refreshPayload, { expiresIn: '10m' });

    return { uid: user.uid, name: user.username, email: user.useremail, roles: user.roles, token, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);

      if (payload.purpose !== 'refresh') {
        throw new UnauthorizedException('El refresh token proporcionado no es válido');
      }

      const user = await this.userRepository.findOne({ where: { useremail: payload.email } });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado.');
      }

      const newPayload = { uid: user.uid, email: user.useremail, roles: user.roles, purpose: 'newToken', refresh: true };
      const newToken = await this.jwtService.signAsync(newPayload, { expiresIn: '5m' });

      return { token: newToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async signUp(signUpDto: PersonDto) {
    const existingUser = await this.userRepository.findOne({ where: { useremail: signUpDto.useremail } });

    if (existingUser) {
      throw new UnauthorizedException('Pruebe con un correo electrónico diferente.');
    }

    const newUser = this.userRepository.create(signUpDto);
    const savedAccount = await this.userRepository.save(newUser);

    return this.generateTokens(savedAccount);
  }

  async validateUser(useremail: string, userpassword: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { useremail } });

    if (!user) {
      throw new UnauthorizedException('Email no fue encontrado');
    }

    const isPasswordValid = await compare(userpassword, user.userpassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta.');
    }

    const { userpassword: _, ...result } = user;

    return result;
  }

  async signIn(signInDto: PersonDto) {
    const user = await this.validateUser(signInDto.useremail, signInDto.userpassword);
    return this.generateTokens(user);
  }

  async sendPasswordResetEmail(reset: PersonDto) {
    try {
      const user = await this.userRepository.findOne({ where: { useremail: reset.useremail } });

      if (!user) {
        throw new UnauthorizedException('Este email es invalido, por favor vuelva a intentarlo.');
      }

      const payload = { uid: user.uid, roles: user.roles, purpose: 'Reset Password' };
      const tokenReset = await this.jwtService.signAsync(payload, { expiresIn: '10m', secret: 'JWT_SECRET' });

      const checkLink = `http://localhost:4200/auth/recover/password/?uid=${user.uid}&token=${tokenReset}`;

      const emailContent = `
        <p>Hola ${user.username}, este link va a estar activo por solo 10 minutos.</p>
        ${checkLink}
      `;

      const to = user.useremail;
      const subject = 'Actualizar contraseña';
      const html = emailContent;

      await this.nodemailerService.sendMail({ email: to, subject, html });
      return { message: `Se ha enviado el correo electronico a: ${user.useremail}` };
    } catch (error) {
      throw new InternalServerErrorException('No pudo procesar la solicitud de restablecimiento de contraseña.');
    }
  }
}
