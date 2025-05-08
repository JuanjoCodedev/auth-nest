import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/* Entity */
import { AccessLevelEntity } from '../auth/access-level/access-level.entity';

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
  address: string;

  @ManyToOne(() => AccessLevelEntity, (role) => role.users)
  @JoinColumn({ name: 'id_rol' })
  id_rol: AccessLevelEntity;

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
