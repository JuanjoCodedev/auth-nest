import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RolesDto } from './roles.dto';

@ApiTags('Autenticación')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * ?Crea un nuevo rol.
   *
   * *@param rolesDto - Datos necesarios para la creación del rol.
   * *@returns - Retorna el objeto creado con la información del nuevo rol.
   */
  @Post('newRol')
  @ApiOperation({ summary: 'Crea un nuevo rol.' })
  @ApiBody({ type: RolesDto })
  @ApiResponse({ status: 201, description: 'Nuevo rol creado exitosamente.', type: RolesDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createAccount(@Body() rolesDto: RolesDto) {
    return await this.rolesService.createRol(rolesDto);
  }
}
