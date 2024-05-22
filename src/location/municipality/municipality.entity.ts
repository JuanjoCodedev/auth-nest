import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DepartmentEntity } from '../department/department.entity';

@Entity("municipality")
export class MunicipalityEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'boolean', default: false })
    status: boolean = false;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'int' })
    department_id: number;

    @Column({ type: 'boolean' })
    is_city: boolean;

    @ManyToOne(() => DepartmentEntity, (department) => department.municipalities)
    @JoinColumn({ name: 'department_id' })
    department: DepartmentEntity;
}