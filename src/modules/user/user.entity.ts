import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

/* Entity */
import { RolesEntity } from '../auth/roles/roles.entity';
import { CityEntity } from '../location/city/city.entity';
import { CountryEntity } from '../location/country/country.entity';

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
  id_city: number;

  @OneToOne(() => CountryEntity, (userCountry) => userCountry.countryUser)
  @JoinColumn({ name: 'id_country' })
  userCountry: CountryEntity;

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
