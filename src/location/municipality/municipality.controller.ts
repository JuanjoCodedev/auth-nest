import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MunicipalityService } from './municipality.service';
import { MunicipalityCreateDto, MunicipalityUpdateDto, MunicipalityUpdateStatusDto } from './municipality.dto';

@ApiTags('Ubicación')
@Controller('municipality')
export class MunicipalityController {
    constructor(private readonly _municipalityService: MunicipalityService) { }

    @Get()
    public async searchMunicipality(@Query('page', ParseIntPipe) page = 1, @Query('limit', ParseIntPipe) limit = 10, @Query('nameMunicipality') nameMunicipality?: string, @Query('departmentId') departmentId?: number, @Query('isCity') isCity?: boolean) {
        return await this._municipalityService.searchMunicipality(page, limit, nameMunicipality, departmentId, isCity);
    }

    @Post()
    public async createMunicipality(@Body() body: MunicipalityCreateDto) {
        return await this._municipalityService.createMunicipality(body);
    }

    @Patch('/:id')
    public async updateDepartment(@Param('id', ParseIntPipe) id: number, @Body() body: MunicipalityUpdateDto) {
        return await this._municipalityService.updateMunicipality(id, body);
    }

    @Put('status/:id')
    public async updateStatusDeparment(@Param('id', ParseIntPipe) id: number, @Body() body: MunicipalityUpdateStatusDto) {
        return await this._municipalityService.updateStatusMunicipality(id, body);
    }
}
