import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  uid: number;

  @Column({ unique: true })
  useremail: string;

  @Column()
  userpassword: string;

  @Column()
  username: string;

  @Column()
  roles: number = 3;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      const saltOrRounds = 10;
      this.userpassword = await bcrypt.hash(this.userpassword, saltOrRounds);
    } catch (error) {
      // Manejar el error (por ejemplo, registrándolo o lanzándolo)
      console.error('Error al cifrar la contraseña:', error);
      throw error; // Volver a lanzar el error para indicar un problema
    }
  }
}
