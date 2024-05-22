import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryDto } from './country.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'src/shared/dto/query.dto';

@ApiTags('Ubicacion')
@Controller('country')
export class CountryController {
  constructor(private readonly _countryService: CountryService) {}

  /**
   * ?Endpoint para obtener y filtrar una lista de paises.
   *
   * *@param query Parámetros opcionales para filtrar y paginar los paises.
   * *@returns Un objeto con los paises filtradas y datos de paginación.
   */
  @Get('getCountry')
  @ApiOperation({ summary: 'Obtiene y filtra las paises.' })
  @ApiResponse({ status: 200, description: 'Data con información obtenida.', type: QueryDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async getCompany(@Query(new ValidationPipe()) query: QueryDto) {
    const mergedQuery = { limit: 10, page: 1, order: 'name', name: '', ...query };
    return this._countryService.getCountry(mergedQuery);
  }

  /**
   * ?Endpoint para crear una nuevo país.
   *
   * *@param body Objeto que contiene los datos del nuevo país.
   * *@returns Un mensaje de confirmación y los datos del país creado.
   */
  @Post('createCountry')
  @ApiOperation({ summary: 'Crea una nuevo país.' })
  @ApiResponse({ status: 201, description: 'País creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createCountry(@Body() body: CountryDto) {
    return this._countryService.createCountry(body);
  }
}
