import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/* Service */
import { CountryService } from './country.service';

/* Dtos */
import { CountryDto } from './country.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@ApiTags('Ubicacion')
@Controller('country')
export class CountryController {
  constructor(private readonly _countryService: CountryService) { }

  @Get('getCountry')
  @ApiOperation({ summary: 'Obtiene y filtra las paises.' })
  @ApiResponse({ status: 200, description: 'Data con información obtenida.', type: QueryDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async getCountry(@Query(new ValidationPipe()) query: QueryDto) {
    const mergedQuery = { limit: 10, page: 1, order: 'name', name: '', ...query };
    return this._countryService.getCountry(mergedQuery);
  }

  @Post('createCountry')
  @ApiOperation({ summary: 'Crea una nuevo país.' })
  @ApiResponse({ status: 201, description: 'País creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createCountry(@Body() body: CountryDto) {
    return this._countryService.createCountry(body);
  }
}
