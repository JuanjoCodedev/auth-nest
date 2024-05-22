import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { ValidateDto } from 'src/shared/dtos/validate.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(useremail: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { useremail } });
  }

  async createAccount(newAccount: ValidateDto) {
    const { useremail } = newAccount;

    const validateEmail = await this.userRepository.findOne({
      where: { useremail },
    });

    if (validateEmail) throw new UnauthorizedException('Pruebe con un correo electronico diferente.');

    const createAccount = this.userRepository.create(newAccount);
    return this.userRepository.save(createAccount);
  }
}
