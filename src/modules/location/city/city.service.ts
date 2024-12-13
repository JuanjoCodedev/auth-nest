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

  /**
   * ?Obtiene y filtra una lista de ciudades.
   *
   * *@param query Objeto `QueryDto` que contiene parámetros opcionales para la consulta.
   * *@returns Un objeto con los datos de las ciudades, el total de registros, las páginas totales, y la página actual.
   */
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

  /**
   * ?Crea una nueva ciudad.
   *
   * *@param body Objeto `CityDto` que contiene los datos necesarios para crear una ciudad.
   * *@returns Un objeto con un mensaje de confirmación y los datos de la ciudad creada.
   * *@throws ConflictException Si ya existe una ciudad con el mismo nombre.
   */
  async cityCreate(body: CityDto) {
    const city = await this._cityRepository.findOne({ where: { name: body.name } });

    if (city) throw new ConflictException(`La ciudad ${body.name} ya se existe.`);

    const city_create = this._cityRepository.create(body);
    const city_save = await this._cityRepository.save(city_create);

    return { message: 'Ciudad creada exitosamente.', data: city_save };
  }
}
