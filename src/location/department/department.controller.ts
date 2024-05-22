import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DepartmentService } from './department.service';

import { DepartmentCreateDto, DepartmentUpdateDto, DepartmentUpdateStatusDto } from './department.dto';

@ApiTags('Ubicación')
@Controller('department')
export class DepartmentController {
    constructor(private readonly _departmentService: DepartmentService) { }

    @Get()
    public async searchDepartment(@Query('page', ParseIntPipe) page = 1, @Query('limit', ParseIntPipe) limit = 10, @Query('nameDepartment') nameDepartment?: string, @Query('countryId') countryId?: number) {
        return await this._departmentService.searchDepartment(page, limit, nameDepartment, countryId);
    }

    @Post()
    public async createDeparment(@Body() body: DepartmentCreateDto) {
        return await this._departmentService.createDepartment(body);
    }

    @Patch('/:id')
    public async updateDepartment(@Param('id', ParseIntPipe) id: number, @Body() body: DepartmentUpdateDto) {
        return await this._departmentService.updateDepartment(id, body);
    }

    @Put('status/:id')
    public async updateStatusDeparment(@Param('id', ParseIntPipe) id: number, @Body() body: DepartmentUpdateStatusDto) {
        return await this._departmentService.updateStatusDepartment(id, body);
    }
}
