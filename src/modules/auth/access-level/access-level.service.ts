import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { AccessLevelEntity } from './access-level.entity';

/* Dtos */
import { AccessLevelDto } from './access-level.dto';

/* Interface */
import { Int_Access_Level_Response } from './access-level.interface';

@Injectable()
export class AccessLevelService {
  constructor(
    @InjectRepository(AccessLevelEntity)
    private readonly accessLevelRepository: Repository<AccessLevelEntity>,
  ) { }

  async createAccessLevel(body: AccessLevelDto): Promise<Int_Access_Level_Response> {
    const existingAccessLevel = await this.accessLevelRepository.findOne({ where: { name: body.name } });

    if (existingAccessLevel) throw new ConflictException(`El nivel de acceso "${body.name}" ya está en uso. Por favor, prueba con otro nombre.`);

    const newAccessLevel = this.accessLevelRepository.create(body);
    const saveAccessLevel = await this.accessLevelRepository.save(newAccessLevel);

    return { message: 'Nuevo nivel de acceso creado exitosamente.', data: saveAccessLevel };
  }

  async getUserAccessLevelWithRouteAccess(userId: number): Promise<AccessLevelEntity[]> {
    return await this.accessLevelRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.rolPermissions', 'rolPermission')
      .leftJoinAndSelect('rolPermission.permission', 'permissions')
      .leftJoinAndSelect('role.users', 'usr')
      .where('usr.id = :id', { id: userId })
      .getMany();
  }
}
