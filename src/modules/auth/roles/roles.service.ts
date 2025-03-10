import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { RolesEntity } from './roles.entity';

/* Dtos */
import { RolesDto } from './roles.dto';

/* Interface */
import { Int_Roles_Response } from './roles.interface';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) { }

  async createRol(body: RolesDto): Promise<Int_Roles_Response> {
    const existingRole = await this.rolesRepository.findOne({ where: { name: body.name } });

    if (existingRole) throw new ConflictException(`El rol "${body.name}" ya está en uso. Por favor, prueba con otro nombre.`);

    const newRole = this.rolesRepository.create(body);
    const savedRole = await this.rolesRepository.save(newRole);

    return { message: 'Nuevo rol creado exitosamente.', data: savedRole };
  }

  async getUserRolesWithPermissions(userId: number): Promise<RolesEntity[]> {
    return await this.rolesRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.rolPermissions', 'rolPermission')
      .leftJoinAndSelect('rolPermission.permission', 'permissions')
      .leftJoinAndSelect('role.users', 'usr')
      .where('usr.id = :id', { id: userId })
      .getMany();
  }
}
