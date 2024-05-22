import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolPermissionsService } from './rol_permissions.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RolPermissionsDto } from './rol_permissions.dto';

@ApiTags('Autenticación')
@Controller('rp')
export class RolPermissionsController {
  constructor(private readonly rolPermissionsService: RolPermissionsService) {}

  /**
   * ?Crea una nueva relación entre un rol y permisos.
   *
   * *@param permissionsDto - Objeto DTO con los datos para asignar el rol y los permisos.
   * *@returns - Respuesta con el rol y permisos asignados, o un error en caso de datos inválidos.
   */
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
