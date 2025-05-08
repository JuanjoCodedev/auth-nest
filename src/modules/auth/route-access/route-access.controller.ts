import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/* Service */
import { RouteAccessService } from './route-access.service';

/* Dtos */
import { RouteAccessDto } from './route-access.dto';

/* Interface */
import { Int_Route_Access_Response } from './route-access.interface';

@ApiTags('Autenticación')
@Controller('route-access')
export class RouteAccessController {
  constructor(private readonly routeAccessService: RouteAccessService) { }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva ruta de acceso.' })
  @ApiBody({ type: RouteAccessDto })
  @ApiResponse({ status: 201, description: 'Nueva ruta de acceso creada exitosamente.', type: RouteAccessDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createRouteAccess(@Body() permissionsDto: RouteAccessDto): Promise<Int_Route_Access_Response> {
    return await this.routeAccessService.createRouteAccess(permissionsDto);
  }
}
