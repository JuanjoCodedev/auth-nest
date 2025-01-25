import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

/* Service */
import { RolesService } from './roles.service';

/* Dtos */
import { RolesDto } from './roles.dto';

@ApiTags('Autenticación')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post('newRol')
  @ApiOperation({ summary: 'Crea un nuevo rol.' })
  @ApiBody({ type: RolesDto })
  @ApiResponse({ status: 201, description: 'Nuevo rol creado exitosamente.', type: RolesDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createRol(@Body() rolesDto: RolesDto) {
    return await this.rolesService.createRol(rolesDto);
  }
}
