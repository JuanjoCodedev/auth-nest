import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

/* Entity */
import { RolesEntity } from '../auth/roles/roles.entity';
import { CityEntity } from '../location/city/city.entity';
import { CountryEntity } from '../location/country/country.entity';
import { DepartmentEntity } from '../location/department/department.entity';

@Entity('person')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  id_country: number;

  @Column()
  id_department: number;

  @Column()
  address: string;

  @Column()
  id_city: number;

  @OneToOne(() => CountryEntity, (userCountry) => userCountry.countryUser)
  @JoinColumn({ name: 'id_country' })
  userCountry: CountryEntity;

  @OneToOne(() => DepartmentEntity, (userDepartment) => userDepartment.departmentUser)
  @JoinColumn({ name: 'id_department' })
  userDepartment: CityEntity;

  @OneToOne(() => CityEntity, (userCity) => userCity.cityUser)
  @JoinColumn({ name: 'id_city' })
  userCity: CityEntity;

  @ManyToOne(() => RolesEntity, (role) => role.users)
  @JoinColumn({ name: 'id_rol' })
  id_rol: RolesEntity;

  @Column()
  photoUrl: string;

  @Column()
  provider: string;

  @Column()
  ipAddress: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  status: boolean;

  token?: string;
  refreshToken?: string;
}
