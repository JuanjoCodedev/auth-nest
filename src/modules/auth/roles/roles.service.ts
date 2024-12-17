import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';
import { RolesDto } from './roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async createRol(body: RolesDto) {
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
