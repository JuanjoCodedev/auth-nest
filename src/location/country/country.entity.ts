import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("country")
export class CountryEntity {
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
}