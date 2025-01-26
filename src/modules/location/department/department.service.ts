import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

/* Entity */
import { DepartmentEntity } from './department.entity';

/* Dto */
import { QueryDto } from 'src/shared/dto/query.dto';
import { DepartmentDto } from './department.dto';

/* Interface */
import { Int_Department_Pagination_Response, Int_Department_Response } from './department.interface';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly _departmentRepository: Repository<DepartmentEntity>,
  ) { }

  async getDepartment(query: QueryDto): Promise<Int_Department_Pagination_Response> {
    const { page, limit, order, name } = query;

    const skip = (page - 1) * limit;

    const [department, totalCount] = await this._departmentRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      take: limit,
      skip: skip,
      order: { [order]: 'ASC' },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { data: department, totalCount, totalPages, currentPage: page };
  }

  async departmentCreate(body: DepartmentDto): Promise<Int_Department_Response> {
    const department = await this._departmentRepository.findOne({ where: { name: body.name } });

    if (department) throw new ConflictException(`El departamento ${body.name} ya existe.`);

    const departmentCreate = this._departmentRepository.create(body);
    const departmentSave = await this._departmentRepository.save(departmentCreate);

    return { message: 'Departamento creado con exito', data: departmentSave };
  }
}
