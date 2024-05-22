import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * ?Busca un usuario en la base de datos usando su email.
   *
   * *@param userEmail - El email del usuario a buscar.
   * *@returns El usuario encontrado o null si no existe.
   */
  async findOneByEmail(userEmail: string) {
    return this.userRepository.findOne({ where: { email: userEmail } });
  }

  /**
   * ?Genera una contraseña aleatoria de 8 caracteres.
   *
   * *@returns La contraseña aleatoria generada.
   */
  generateRandomPassword(): string {
    const randomPassword = Math.random().toString(36).slice(-8);
    return randomPassword;
  }

   /**
   * ?Registra un nuevo usuario utilizando datos proporcionados.
   *
   * *@param userData - Datos del usuario para crear una nueva cuenta.
   * *@returns El usuario creado y registrado en la base de datos.
   */
   async continueWithTheProvider(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}
