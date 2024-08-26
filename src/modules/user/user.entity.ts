import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

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

  @Column()
  roles: number = 2;

  @Column()
  photoUrl: string;

  @Column()
  provider: string;

  @Column()
  ipAddress: string;

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
