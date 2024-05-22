import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from './role.entity';
import { RoleDto } from './role.dto';
import { Auth } from '../auth.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleEntityRepository: Repository<RoleEntity>,
  ) {}

  private async _validateRole(name: string) {
    return await this._roleEntityRepository.findOne({ where: { name } });
  }

  public async createRole(body: RoleDto): Promise<Auth.ApiResponse<RoleEntity>> {
    const existingRole = await this._validateRole(body.name);
    if (existingRole) throw new ConflictException('Pruebe con un nombre diferente.');

    const newRole = this._roleEntityRepository.create({ ...body, status: true });
    const saveRole = await this._roleEntityRepository.save(newRole);

    return { message: 'Rol creado satifactoriamente.', data: saveRole };
  }
}
