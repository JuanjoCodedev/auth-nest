import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { compare } from 'bcrypt';
import { ValidateDto } from 'src/shared/dtos/validate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(useremail: string, userpassword: string): Promise<any> {
    const isEmailValid = await this.userService.findByEmail(useremail);

    if (!isEmailValid) throw new UnauthorizedException('Email no fue encontrado');

    const isPasswordValid = await compare(userpassword, isEmailValid.userpassword);

    if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta.');

    const { userpassword: _, ...result } = isEmailValid;

    return result;
  }

  async login(login: ValidateDto) {
    const user = await this.validateUser(login.useremail, login.userpassword);

    const payload = { uid: user.uid, email: user.useremail, roles: user.roles };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '1h' });

    return { uid: user.uid, name: user.username, email: user.useremail, roles: user.roles, token };
  }
}
