import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { PermissionsEntity } from './permissions.entity';

/* Service */
import { PermissionsDto } from './permissions.dto';

/* Interface */
import { Int_Permissions_Response } from './interfaces.permissions';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly permissionsRepository: Repository<PermissionsEntity>,
  ) { }


  async newPermission(body: PermissionsDto): Promise<Int_Permissions_Response> {
    const permission = await this.permissionsRepository.findOne({ where: { route: body.route } });

    if (permission) throw new ConflictException(`El permiso "${body.route}" ya está en uso. Por favor, prueba con otro nombre.`);

    const newPermission = this.permissionsRepository.create(body);
    const savedPermission = await this.permissionsRepository.save(newPermission);

    return { message: 'Nuevo permiso creado exitosamente.', data: savedPermission };
  }
}
