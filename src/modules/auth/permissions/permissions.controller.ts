import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { Body, Controller, Post } from '@nestjs/common';
import { PermissionsDto } from './permissions.dto';

@ApiTags('Autenticación')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('newPermission')
  @ApiOperation({ summary: 'Crea un nuevo permiso.' })
  @ApiBody({ type: PermissionsDto })
  @ApiResponse({ status: 201, description: 'Nuevo permiso creado exitosamente.', type: PermissionsDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createAccount(@Body() permissionsDto: PermissionsDto) {
    return await this.permissionsService.newPermission(permissionsDto);
  }
}
