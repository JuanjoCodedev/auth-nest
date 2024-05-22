import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { RolesEntity } from '../auth/roles/roles.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  uid: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @ManyToOne(() => RolesEntity, (role) => role.users)
  @JoinColumn({ name: 'roles' })
  roles: RolesEntity;

  @Column()
  photoUrl: string;

  @Column()
  provider: string;

  @Column()
  ipAddress: string;

  @Column()
  createdAt: Date;

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
