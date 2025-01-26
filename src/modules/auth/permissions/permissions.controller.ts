import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/* Service */
import { PermissionsService } from './permissions.service';

/* Dtos */
import { PermissionsDto } from './permissions.dto';

/* Interface */
import { Int_Permissions_Response } from './interfaces.permissions';

@ApiTags('Autenticación')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post('newPermission')
  @ApiOperation({ summary: 'Crea un nuevo permiso.' })
  @ApiBody({ type: PermissionsDto })
  @ApiResponse({ status: 201, description: 'Nuevo permiso creado exitosamente.', type: PermissionsDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async newPermission(@Body() permissionsDto: PermissionsDto): Promise<Int_Permissions_Response> {
    return await this.permissionsService.newPermission(permissionsDto);
  }
}
