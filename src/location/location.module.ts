import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryController } from './country/country.controller';
import { DepartmentController } from './department/department.controller';

import { CountryService } from './country/country.service';
import { DepartmentService } from './department/department.service';

import { CountryEntity } from './country/country.entity';
import { DepartmentEntity } from './department/department.entity';
import { MunicipalityController } from './municipality/municipality.controller';
import { MunicipalityService } from './municipality/municipality.service';
import { MunicipalityEntity } from './municipality/municipality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, DepartmentEntity, MunicipalityEntity])],
  controllers: [CountryController, DepartmentController, MunicipalityController],
  providers: [CountryService, DepartmentService, MunicipalityService]
})
export class LocationModule { }
