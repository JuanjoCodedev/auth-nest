import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

/* Service */
import { DepartmentService } from './department.service';

/* Dto */
import { DepartmentDto } from './department.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly _departmentService: DepartmentService) {}

  /**
   * ?Endpoint para obtener y filtrar una lista de departamento.
   *
   * *@param query Parámetros opcionales para filtrar y paginar los departamentos.
   * *@returns Un objeto con los departamentos filtradas y datos de paginación.
   */
  @Get('getDepartment')
  @ApiOperation({ summary: 'Obtiene y filtra los departamentos.' })
  @ApiResponse({ status: 200, description: 'Data con información obtenida.', type: QueryDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async getCompany(@Query(new ValidationPipe()) query: QueryDto) {
    const mergedQuery = { limit: 10, page: 1, order: 'name', name: '', ...query };
    return this._departmentService.getDepartment(mergedQuery);
  }

  /**
   * ?Endpoint para crear una nuevo departamento.
   *
   * *@param body Objeto que contiene los datos del nuevo departamento.
   * *@returns Un mensaje de confirmación y los datos del departamento creado.
   */
  @Post('createDepartment')
  @ApiOperation({ summary: 'Crea una nuevo departamento.' })
  @ApiResponse({ status: 201, description: 'Departamento creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  createDepartment(@Body() body: DepartmentDto) {
    return this._departmentService.departmentCreate(body);
  }
}
