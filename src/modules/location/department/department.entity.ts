import { UserEntity } from 'src/modules/user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_DATE' })
  created_at: Date;

  @OneToOne(() => UserEntity, (departmentUser) => departmentUser.userDepartment)
  departmentUser: UserEntity;
}
