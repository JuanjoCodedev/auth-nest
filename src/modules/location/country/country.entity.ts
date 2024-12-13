import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

/* Entity */
import { UserEntity } from 'src/modules/user/user.entity';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_DATE' })
  created_at: Date;

  @OneToOne(() => UserEntity, (countryUser) => countryUser.userCountry)
  countryUser: UserEntity;
}
