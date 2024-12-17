import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsEntity } from './permissions.entity';
import { Repository } from 'typeorm';
import { PermissionsDto } from './permissions.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly permissionsRepository: Repository<PermissionsEntity>,
  ) {}

  async newPermission(body: PermissionsDto) {
    const permission = await this.permissionsRepository.findOne({ where: { route: body.route } });

    if (permission) throw new ConflictException(`El permiso "${body.route}" ya está en uso. Por favor, prueba con otro nombre.`);

    const newPermission = this.permissionsRepository.create(body);
    const savedPermission = await this.permissionsRepository.save(newPermission);

    return { message: 'Nuevo permiso creado exitosamente.', data: savedPermission };
  }
}
