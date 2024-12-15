import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

/* Entity */
import { CountryEntity } from './country.entity';

/* Dto */
import { CountryDto } from './country.dto';
import { QueryDto } from 'src/shared/dto/query.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly _countryRepository: Repository<CountryEntity>,
  ) {}

  /**
   * ?Obtiene y filtra una lista de paises.
   *
   * *@param query Objeto `QueryDto` que contiene parámetros opcionales para la consulta.
   * *@returns Un objeto con los datos de los paises, el total de registros, las páginas totales, y la página actual.
   */
  async getCountry(query: QueryDto) {
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

  /**
   * ?Crea una nuevo país.
   *
   * *@param body Objeto `CountryDto` que contiene los datos necesarios para crear un país.
   * *@returns Un objeto con un mensaje de confirmación y los datos del país creado.
   * *@throws ConflictException Si ya existe un país con el mismo nombre.
   */
  async createCountry(body: CountryDto) {
    const country = await this._countryRepository.findOne({ where: { name: body.name } });

    if (country) throw new ConflictException(`El país ${body.name} ya existe.`);

    const createCountry = this._countryRepository.create(body);
    const saveCountry = await this._countryRepository.save(createCountry);

    return { message: 'País creado exitosamente', data: saveCountry };
  }
}
