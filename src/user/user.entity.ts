import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { RoleEntity } from 'src/authorization/role/role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  status: boolean = false;

  @Column({ type: 'varchar' })
  provider: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  department_id: string;

  @Column({ type: 'varchar' })
  municipality_id: string;

  @Column({ type: 'integer' })
  role_id: number = 2;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
