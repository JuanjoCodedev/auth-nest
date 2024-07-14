import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from 'src/shared/dtos/person.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async recoverPassword(uid: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { uid } });

    if (!user) {
      throw new NotFoundException('Usuario no existe en la base de datos.');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.password, 10);

    await this.userRepository.update({ uid }, { password: hashedPassword });

    const updatedUser = await this.userRepository.findOne({ where: { uid } });

    return { message: 'Contraseña actualizada', user: updatedUser };
  }
}
