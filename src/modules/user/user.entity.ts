import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { RolesEntity } from '../auth/roles/roles.entity';

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
