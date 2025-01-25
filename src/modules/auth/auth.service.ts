import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

/* Entity */
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }


  public async findOneByEmail(userEmail: string) {
    return this.userRepository.findOne({ where: { email: userEmail } });
  }

  public async generateRandomPassword(): Promise<string> {
    const randomPassword = Math.random().toString(36).slice(-8);
    return await this.textHash(randomPassword, 12);
  }

  public async continueWithTheProvider(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  public async textHash(key: string, salt: number): Promise<string> {
    const hashText = await bcrypt.hash(key, salt);
    return hashText;
  }
}
