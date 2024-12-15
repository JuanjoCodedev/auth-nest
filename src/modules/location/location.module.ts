import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Entity */
import { CityEntity } from './city/city.entity';
import { CountryEntity } from './country/country.entity';
import { DepartmentEntity } from './department/department.entity';

/* Service */
import { CityService } from './city/city.service';
import { CountryService } from './country/country.service';
import { DepartmentService } from './department/department.service';

/* Controller */
import { CityController } from './city/city.controller';
import { CountryController } from './country/country.controller';
import { DepartmentController } from './department/department.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity, CountryEntity, DepartmentEntity])],
  providers: [CityService, CountryService, DepartmentService],
  controllers: [CityController, CountryController, DepartmentController],
})
export class LocationModule {}
