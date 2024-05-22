import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  private async _validateUser(id: number) {
    return await this._userRepository.findOne({ where: { id: id } });
  }

  public async UpdateProfile(id: number, body: UserDto) {
    const existingUser = await this._validateUser(id);
    if (!existingUser) throw new NotFoundException('Usuario no encontrado.');

    await this._userRepository.update(id, body);

    return { message: 'Perfil actualizado.' };
  }

  public async updateStatus(id: number) {
    const existingUser = await this._validateUser(id);
    if (!existingUser) throw new NotFoundException('Usuario no encontrado.');

    await this._userRepository.update(id, { status: true });

    return { message: 'Estado actualizado.' };
  }
}
