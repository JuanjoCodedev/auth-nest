import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

/* Entity */
import { CityEntity } from './city.entity';

/* Dtos */
import { CityDto } from './city.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly _cityRepository: Repository<CityEntity>,
  ) {}

  async getCity(query: QueryDto) {
    const { page, limit, order, name } = query;

    const skip = (page - 1) * limit;

    const [city, totalCount] = await this._cityRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      take: limit,
      skip: skip,
      order: { [order]: 'ASC' },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { data: city, totalCount, totalPages, currentPage: page };
  }

  async cityCreate(body: CityDto) {
    const city = await this._cityRepository.findOne({ where: { name: body.name } });

    if (city) throw new ConflictException(`La ciudad ${body.name} ya se existe.`);

    const city_create = this._cityRepository.create(body);
    const city_save = await this._cityRepository.save(city_create);

    return { message: 'Ciudad creada exitosamente.', data: city_save };
  }
}
