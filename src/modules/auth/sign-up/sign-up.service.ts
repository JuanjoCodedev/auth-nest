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

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private authService: AuthService,
    private tokenService: TokensService,
  ) { }

  async signUp(signUpDto: SignUpDto, ipAddress: string) {
    const existingUser = await this.authService.findOneByEmail(signUpDto.email);
    if (existingUser) throw new UnauthorizedException('Pruebe con un correo electrónico diferente.');

    const newUser = this.userRepository.create({ ...signUpDto, ipAddress: ipAddress });
    const savedAccount = await this.userRepository.save(newUser);

    return this.tokenService.generateAccessAndRefreshTokens(savedAccount);
  }
}
