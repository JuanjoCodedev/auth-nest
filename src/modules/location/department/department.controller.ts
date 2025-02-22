import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

/* Service */
import { DepartmentService } from './department.service';

/* Dto */
import { DepartmentDto } from './department.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

/* Interface */
import { Int_Department_Pagination_Response, Int_Department_Response } from './department.interface';

@Controller('department')
export class DepartmentController {
  constructor(private readonly _departmentService: DepartmentService) { }

  @Get('getDepartment')
  @ApiOperation({ summary: 'Obtiene y filtra los departamentos.' })
  @ApiResponse({ status: 200, description: 'Data con información obtenida.', type: QueryDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async getDepartment(@Query(new ValidationPipe()) query: QueryDto): Promise<Int_Department_Pagination_Response> {
    const mergedQuery = { limit: 10, page: 1, order: 'name', name: '', ...query };
    return this._departmentService.getDepartment(mergedQuery);
  }

  @Post('createDepartment')
  @ApiOperation({ summary: 'Crea una nuevo departamento.' })
  @ApiResponse({ status: 201, description: 'Departamento creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  createDepartment(@Body() body: DepartmentDto): Promise<Int_Department_Response> {
    return this._departmentService.departmentCreate(body);
  }
}
