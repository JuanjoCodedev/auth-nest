import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { TokensService } from '../tokens/tokens.service';
import { AuthService } from '../auth.service';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectPinoLogger(SignUpService.name)
    private readonly logger: PinoLogger,

    private authService: AuthService,
    private tokenService: TokensService,
  ) {}

  /**
   * ?Registra un nuevo usuario y genera tokens de autenticación.
   *
   * *@param signUpDto - Datos del usuario para el registro.
   * *@param ipAddress - Dirección IP del usuario para registrar.
   * *@throws UnauthorizedException - Si el email ya está en uso.
   * *@returns Un objeto que contiene tokens de autenticación para el nuevo usuario.
   */
  async signUp(signUpDto: SignUpDto, ipAddress: string) {
    const existingUser = await this.authService.findOneByEmail(signUpDto.email);
    if (existingUser) throw new UnauthorizedException('Pruebe con un correo electrónico diferente.');

    const newUser = this.userRepository.create({ ...signUpDto, ipAddress: ipAddress });
    const savedAccount = await this.userRepository.save(newUser);

    return this.tokenService.generateAccessAndRefreshTokens(savedAccount);
  }
}
