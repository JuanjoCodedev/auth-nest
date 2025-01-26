import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

/* Service */
import { RolPermissionsService } from './rol_permissions.service';

/* Dtos */
import { RolPermissionsDto } from './rol_permissions.dto';

/* Interface */
import { Int_Rol_Permissions_Response } from './rol_permissions.interface';

@ApiTags('Autenticación')
@Controller('rp')
export class RolPermissionsController {
  constructor(private readonly rolPermissionsService: RolPermissionsService) { }

  @Post('newrp')
  @ApiOperation({ summary: 'Asigna permiso y rol.' })
  @ApiBody({ type: RolPermissionsDto })
  @ApiResponse({ status: 201, description: 'Nuevo permiso y rol creado exitosamente.', type: RolPermissionsDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async assignRoleAndPermissions(@Body() permissionsDto: RolPermissionsDto): Promise<Int_Rol_Permissions_Response> {
    return await this.rolPermissionsService.AssignRoleAndPermissions(permissionsDto);
  }
}
