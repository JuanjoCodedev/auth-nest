import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

/* Entity */
import { RolesEntity } from '../auth/roles/roles.entity';
import { CityEntity } from '../location/city/city.entity';
import { CountryEntity } from '../location/country/country.entity';
import { DepartmentEntity } from '../location/department/department.entity';

@Entity('person')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'int2' })
  id_country: number;

  @Column({ type: 'int2' })
  id_department: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'int2' })
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

  @Column({ type: 'varchar' })
  photoUrl: string;

  @Column({ type: 'varchar' })
  provider: string;

  @Column({ type: 'varchar' })
  ipAddress: string;

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_DATE' })
  created_at: Date;

  @Column({ type: 'boolean' })
  status: boolean;

  token?: string;
  refreshToken?: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      const saltOrRounds = 10;
      this.password = await bcrypt.hash(this.password, saltOrRounds);
    } catch (error) {
      throw new InternalServerErrorException('Error al cifrar la contraseña', error);
    }
  }
}
