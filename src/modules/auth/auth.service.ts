import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  public async findOneByEmail(userEmail: string) {
    return this.userRepository.findOne({ where: { email: userEmail } });
  }

  public generateRandomPassword(): string {
    const randomPassword = Math.random().toString(36).slice(-8);
    return randomPassword;
  }

  public async continueWithTheProvider(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}
