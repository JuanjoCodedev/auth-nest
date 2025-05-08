import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

/* Service */
import { AccessLevelService } from './access-level.service';

/* Dtos */
import { AccessLevelDto } from './access-level.dto';

/* Interface */
import { Int_Access_Level_Response } from './access-level.interface';

@ApiTags('Autenticación')
@Controller('access-level')
export class AcessLevelController {
  constructor(private readonly rolesService: AccessLevelService) { }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo nivel de acceso para el usuario.' })
  @ApiBody({ type: AccessLevelDto })
  @ApiResponse({ status: 201, description: 'Nuevo nivel de acceso creado exitosamente.', type: AccessLevelDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createAccessLevel(@Body() rolesDto: AccessLevelDto): Promise<Int_Access_Level_Response> {
    return await this.rolesService.createAccessLevel(rolesDto);
  }
}
