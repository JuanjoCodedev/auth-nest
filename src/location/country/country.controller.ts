import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CountryService } from './country.service';

import { CountryCreateDto, CountryUpdateDto, CountryUpdateStatusDto } from './country.dto';

@ApiTags('Ubicación')
@Controller('country')
export class CountryController {
    constructor(private readonly _countryService: CountryService) { }

    @Get()
    public async searchCountry(@Query('page', ParseIntPipe) page = 1, @Query('limit', ParseIntPipe) limit = 10, @Query('nameCountry') nameCountry?: string) {
        return await this._countryService.searchCountry(page, limit, nameCountry);
    }

    @Post()
    public async createCountry(@Body() body: CountryCreateDto) {
        return await this._countryService.createCountry(body);
    }

    @Patch('/:id')
    public async updateCountry(@Param('id', ParseIntPipe) id: number, @Body() body: CountryUpdateDto) {
        return await this._countryService.updateCountry(id, body);
    }

    @Put('status/:id')
    public async updateStatusCountry(@Param('id', ParseIntPipe) id: number, @Body() body: CountryUpdateStatusDto) {
        return await this._countryService.updateStatusCountry(id, body);
    }
}
