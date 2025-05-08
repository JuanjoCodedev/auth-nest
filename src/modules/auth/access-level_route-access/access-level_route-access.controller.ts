import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

/* Service */
import { AccessLevelRouteAccess } from './access-level_route-access.service';

/* Dtos */
import { AccessLevelRouteAccessDto } from './access-level_route-access.dto';

/* Interface */
import { Int_Access_Level_Route_Access_Response } from './access-level_route-access.interface';

@ApiTags('Autenticación')
@Controller('access-level_route-access')
export class AccessLevelRouteAccessController {
  constructor(private readonly rolPermissionsService: AccessLevelRouteAccess) { }

  @Post()
  @ApiOperation({ summary: 'Asigna nivel de acceso y ruta de acceso al usuario.' })
  @ApiBody({ type: AccessLevelRouteAccessDto })
  @ApiResponse({ status: 201, description: 'Ruta de acceso y nivel de acceso asignados correctamente.', type: AccessLevelRouteAccessDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async assignRoleAndPermissions(@Body() permissionsDto: AccessLevelRouteAccessDto): Promise<Int_Access_Level_Route_Access_Response> {
    return await this.rolPermissionsService.AssignAccessLevelAndRouteAccess(permissionsDto);
  }
}
