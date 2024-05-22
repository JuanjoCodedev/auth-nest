import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CountryEntity } from './country.entity';

import { CountryCreateDto, CountryUpdateDto, CountryUpdateStatusDto } from './country.dto';

@Injectable()
export class CountryService {
    constructor(@InjectRepository(CountryEntity)
    private readonly _countryRepository: Repository<CountryEntity>
    ) { }

    public async searchCountry(page: number = 1, limit: number = 10, nameCountry?: string) {
        const filters: Record<string, any> = {};
        if (nameCountry) filters.name = ILike(`%${nameCountry}%`);

        const [countries, totalCount] = await this._countryRepository.findAndCount({
            where: filters,
            take: limit,
            skip: (page - 1) * limit,
            order: { id: 'ASC' },
        });

        return { data: countries, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page };
    }

    public async createCountry(body: CountryCreateDto) {
        const country = await this._countryRepository.findOne({ where: { name: body.name } });
        if (country) throw new ConflictException('El país ya existe.');

        const newCountry = this._countryRepository.create(body);
        return this._countryRepository.save(newCountry);
    }

    public async updateCountry(id: number, body: CountryUpdateDto) {
        const country = await this._countryRepository.findOne({ where: { id } });
        if (!country) throw new NotFoundException('El país no existe.');

        if (body.name) {
            const existing = await this._countryRepository.findOne({ where: { name: body.name } });
            if (existing && existing.id !== id) throw new ConflictException('Ya existe un país con ese nombre.');
        }

        await this._countryRepository.update(id, { ...body, updated_at: new Date() });

        return ({ message: "País actualizado." });
    }

    public async updateStatusCountry(id: number, body: CountryUpdateStatusDto) {
        const country = await this._countryRepository.findOne({ where: { id } });
        if (!country) throw new NotFoundException('El país no existe.');

        const newStatus = !country.status;
        await this._countryRepository.update(id, { status: newStatus, updated_at: new Date() })

        return ({ message: "País actualizado." });
    }
}
