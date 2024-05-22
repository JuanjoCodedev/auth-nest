import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { DepartmentEntity } from './department.entity';
import { DepartmentCreateDto, DepartmentUpdateDto, DepartmentUpdateStatusDto } from './department.dto';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(DepartmentEntity)
    private readonly _departmentRepository: Repository<DepartmentEntity>
    ) { }

    public async searchDepartment(page: number = 1, limit: number = 10, nameDepartment?: string, countryId?: number) {
        const filters: Record<string, any> = {};
        if (nameDepartment) filters.name = ILike(`%${nameDepartment}%`);
        if (countryId) filters.country_id = countryId;

        const [departments, totalCount] = await this._departmentRepository.findAndCount({
            where: filters,
            take: limit,
            skip: (page - 1) * limit,
            order: { id: 'ASC' },
        });

        return { data: departments, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page };
    }

    public async createDepartment(body: DepartmentCreateDto) {
        const department = await this._departmentRepository.findOne({ where: { name: body.name } });
        if (department) throw new ConflictException('El departamento ya existe.');

        const newDepartment = this._departmentRepository.create(body);
        return this._departmentRepository.save(newDepartment);
    }

    public async updateDepartment(id: number, body: DepartmentUpdateDto) {
        const department = await this._departmentRepository.findOne({ where: { id } });
        if (!department) throw new NotFoundException('El departamento no existe.');

        if (body.name) {
            const existing = await this._departmentRepository.findOne({ where: { name: body.name } });
            if (existing && existing.id !== id) throw new ConflictException('Ya existe un departamento con ese nombre.');
        }

        await this._departmentRepository.update(id, { ...body, updated_at: new Date() });

        return ({ message: "Departamento actualizado." });
    }

    public async updateStatusDepartment(id: number, body: DepartmentUpdateStatusDto) {
        const department = await this._departmentRepository.findOne({ where: { id } });
        if (!department) throw new NotFoundException('El departamento no existe.');

        const newStatus = !department.status;
        await this._departmentRepository.update(id, { status: newStatus, updated_at: new Date() });

        return ({ message: "Departamento actualizado." });
    }
}
