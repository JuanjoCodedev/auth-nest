import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { PersonDto, UpdatePasswordDto } from 'src/shared/dtos/person.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * ?Obtiene el perfil del usuario autenticado.
   *
   * *@param uid - Contiene el identificador unico del usuario.
   * *@returns  Un objeto con un mensaje de confirmación y la informacion del usuario.
   */
  async userProfile(uid: number) {
    const user: UserEntity = await this.userRepository.findOne({ where: { uid } });

    if (!user) throw new UnauthorizedException('Usuario denegado');

    return { message: 'Perfil de usuario: ', user };
  }

  /**
   * ?Actualiza la contraseña del usuario si su Token es válido.
   *
   * *@param uid - Contiene el identificador único del usuario.
   * *@param updatePasswordDto - Contiene la nueva contraseña a actualizar.
   * *@throws NotFoundException - Si el usuario no existe en la base de datos.
   * *@returns Un objeto con un mensaje de confirmación y la información del usuario.
   */
  async recoverPassword(uid: number, updatePasswordDto: UpdatePasswordDto) {
    const user: UserEntity = await this.userRepository.findOne({ where: { uid } });

    if (!user) {
      throw new NotFoundException('Usuario no existe en la base de datos.');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.password, 10);

    const updatedUser = await this.userRepository.update({ uid }, { password: hashedPassword });

    return { message: 'Contraseña actualizada', user: updatedUser };
  }
}
