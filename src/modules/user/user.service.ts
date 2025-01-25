import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

/* Entity */
import { UserEntity } from './user.entity';

/* Dto */
import { UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async userProfile(id: number) {
    const user: UserEntity = await this.userRepository.findOne({ where: { id }, relations: ['id_rol'] });

    if (!user) throw new UnauthorizedException('Usuario denegado');

    // ?Elimina la propiedad 'password' del usuario
    const { password, id_rol, ...userWithoutPassword } = user;

    // ?Crea una nueva versión de id_rol sin incluir el campo 'id'
    const roleWithoutId = id_rol ? { name: id_rol.name } : null;

    return {
      message: 'Perfil de usuario: ',
      user: { ...userWithoutPassword, id_rol: roleWithoutId },
    };
  }


  async recoverPassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user: UserEntity = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no existe en la base de datos.');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.password, 10);

    await this.userRepository.update({ id }, { password: hashedPassword });

    const updatedUser = await this.userRepository.findOne({ where: { id } });

    return { message: 'Contraseña actualizada', user: updatedUser };
  }
}
