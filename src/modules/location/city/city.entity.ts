import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

/* Entity */
import { UserEntity } from 'src/modules/user/user.entity';

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_DATE' })
  created_at: Date;

  @OneToOne(() => UserEntity, (cityUser) => cityUser)
  cityUser: UserEntity;
}
