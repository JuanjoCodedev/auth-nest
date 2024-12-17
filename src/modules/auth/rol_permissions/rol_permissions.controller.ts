import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolPermissionsService } from './rol_permissions.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RolPermissionsDto } from './rol_permissions.dto';

@ApiTags('Autenticación')
@Controller('rp')
export class RolPermissionsController {
  constructor(private readonly rolPermissionsService: RolPermissionsService) {}

  @Post('newrp')
  @ApiOperation({ summary: 'Asigna permiso y rol.' })
  @ApiBody({ type: RolPermissionsDto })
  @ApiResponse({ status: 201, description: 'Nuevo permiso y rol creado exitosamente.', type: RolPermissionsDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createAccount(@Body() permissionsDto: RolPermissionsDto) {
    console.log('Received body:', permissionsDto);
    return await this.rolPermissionsService.AssignRoleAndPermissions(permissionsDto);
  }
}
