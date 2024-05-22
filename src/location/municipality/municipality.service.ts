import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { MunicipalityEntity } from './municipality.entity';

import { MunicipalityCreateDto, MunicipalityUpdateDto, MunicipalityUpdateStatusDto } from './municipality.dto';

@Injectable()
export class MunicipalityService {
    constructor(@InjectRepository(MunicipalityEntity)
    private readonly _municipalityRepository: Repository<MunicipalityEntity>
    ) { }

    public async searchMunicipality(page: number = 1, limit: number = 10, nameMunicipality?: string, departmentId?: number, isCity?: boolean) {
        const filters: Record<string, any> = {};
        if (nameMunicipality) filters.name = ILike(`%${nameMunicipality}%`);
        if (departmentId) filters.department_id = departmentId;
        if (isCity !== undefined) filters.is_city = isCity;

        const municipalities = await this._municipalityRepository.find({
            where: filters,
            take: limit + 1,
            skip: (page - 1) * limit,
            relations: ['department'],
            order: { id: 'ASC' },
        });

        const hasNextPage = municipalities.length > limit;

        return { data: municipalities.slice(0, limit), currentPage: page, pageSize: limit, hasNextPage };
    }


    public async createMunicipality(body: MunicipalityCreateDto) {
        const municipality = await this._municipalityRepository.findOne({ where: { name: body.name } });
        if (municipality) throw new ConflictException('El municipio ya existe.');

        const newMunicipality = this._municipalityRepository.create(body);
        return this._municipalityRepository.save(newMunicipality);
    }

    public async updateMunicipality(id: number, body: MunicipalityUpdateDto) {
        const municipality = await this._municipalityRepository.findOne({ where: { id } });
        if (!municipality) throw new NotFoundException('El municipio no existe.');

        if (body.name) {
            const existing = await this._municipalityRepository.findOne({ where: { name: body.name, department_id: body.department_id } });
            if (existing && existing.id !== id) throw new ConflictException('Ya existe un municipio con ese nombre.');
        }

        await this._municipalityRepository.update(id, { ...body, updated_at: new Date() });

        return ({ message: "Municipio actualizado." });
    }

    public async updateStatusMunicipality(id: number, body: MunicipalityUpdateStatusDto) {
        const municipality = await this._municipalityRepository.findOne({ where: { id } });
        if (!municipality) throw new NotFoundException('El departamento no existe.');

        const newStatus = !municipality.status;
        await this._municipalityRepository.update(id, { status: newStatus, updated_at: new Date() });

        return ({ message: "Municipio actualizado." });
    }
}
