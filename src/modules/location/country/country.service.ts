import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

/* Entity */
import { CountryEntity } from './country.entity';

/* Dto */
import { CountryDto } from './country.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

/* Interface */
import { Int_Country_Pagination_Response, Int_Country_Response } from './country.interface';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly _countryRepository: Repository<CountryEntity>,
  ) { }

  async getCountry(query: QueryDto): Promise<Int_Country_Pagination_Response> {
    const { page, limit, order, name } = query;

    const skip = (page - 1) * limit;

    const [country, totalCount] = await this._countryRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      take: limit,
      skip: skip,
      order: { [order]: 'ASC' },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { data: country, totalCount, totalPages, currentPage: page };
  }

  async createCountry(body: CountryDto): Promise<Int_Country_Response> {
    const country = await this._countryRepository.findOne({ where: { name: body.name } });

    if (country) throw new ConflictException(`El país ${body.name} ya existe.`);

    const createCountry = this._countryRepository.create(body);
    const saveCountry = await this._countryRepository.save(createCountry);

    return { message: 'País creado exitosamente', data: saveCountry };
  }
}
