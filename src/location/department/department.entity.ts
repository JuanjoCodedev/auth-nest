import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MunicipalityEntity } from '../municipality/municipality.entity';

@Entity("department")
export class DepartmentEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'boolean' })
    status: boolean

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'int' })
    country_id: number;

    @OneToMany(() => MunicipalityEntity, (municipality) => municipality.department)
    municipalities: MunicipalityEntity[];
}