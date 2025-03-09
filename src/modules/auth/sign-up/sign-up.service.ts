import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { UserEntity } from 'src/modules/user/user.entity';

/* Service */
import { TokensService } from '../tokens/tokens.service';
import { AuthService } from '../auth.service';

/* Dtos */
import { SignUpDto } from './sign-up.dto';

/* Interface */
import { Int_Auth_Response } from '../auth.interface';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private authService: AuthService,
    private tokenService: TokensService,
  ) { }

  async signUp(signUpDto: SignUpDto, ipAddress: string): Promise<Int_Auth_Response> {
    const existingUser = await this.authService.findOneByEmail(signUpDto.email);
    if (existingUser) throw new UnauthorizedException('Pruebe con un correo electrónico diferente.');

    const passHash = await this.authService.textHash(signUpDto.password, 12);

    const newUser: UserEntity = this.userRepository.create({ ...signUpDto, password: passHash, ipAddress: ipAddress, provider: "manual", id_rol: { id: signUpDto.id_rol ?? 1 }, status: false });
    const savedAccount: UserEntity = await this.userRepository.save(newUser);

    return this.tokenService.generateAccessAndRefreshTokens(savedAccount);
  }
}
